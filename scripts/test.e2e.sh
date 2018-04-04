set -e

cd $(dirname $(dirname "$0"))

case $1 in
  help|--help)
    echo "Usage: test.e2e.sh [platform] [-r|--release] [-R|--record]"
    exit 0
  ;;
  android) PLATFORM=$1; shift;;
  -*|"") PLATFORM=$([[ $OSTYPE == "darwin"* ]] && echo "ios" || echo "android");;
  *) >&2 echo "Invalid platform $1"; exit 1;;
esac

PIDS=()

function close {
  # Close background processes created by this script
  echo ${PIDS[*]} | tr " " "\n" | xargs kill -9 > /dev/null
}

trap close EXIT

BUILD=
BUILD_TYPE=debug
export REPLAY_PORT=4040
export API_URL=http://localhost:$REPLAY_PORT

while true; do
case $1 in
  -r|--release) BUILD_TYPE=release; shift;;
  -R|--record) export REPLAY_MODE=record; shift;;
  --build) BUILD=true; shift;;
  *) break;;
esac
done

# Start backend replay server
scripts/server.js &
PIDS+=($!)

# Start bundler if it isn't running already
if [[ `nc -z localhost 8081 || echo \$?` -eq 1 ]]; then
  echo "Starting metro bundler"
  react-native start --reset-cache > /dev/null &
  PIDS+=($!)
fi

if [[ $BUILD ]]; then
  detox build -c "$PLATFORM.$BUILD_TYPE";
fi

# Run tests
detox test -c "$PLATFORM.$BUILD_TYPE" --platform $PLATFORM
