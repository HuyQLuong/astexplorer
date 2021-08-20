set -e
CLOUD=${CLOUD:"azure"}
# On Prem is always use AWS for now
if [ "$CLOUD" = "aws" ] || [ "$SUB_REPOSITORY" = "on_prem" ]; then
  REPO_BASE="326348232034.dkr.ecr.ap-southeast-1.amazonaws.com"
  aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 326348232034.dkr.ecr.ap-southeast-1.amazonaws.com
else
  REPO_BASE="quodaide.azurecr.io"
  az acr login -n QuodAIDE
fi
SHOULD_PUSH=${SHOULD_PUSH:-true}

NAMESPACE=${NAMESPACE:-"de"}
if [ "$SUB_REPOSITORY" != "" ]; then
  REPO_BASE="$REPO_BASE/$SUB_REPOSITORY"
fi
REPO_BASE="$REPO_BASE/$NAMESPACE"


BRANCH=$(git branch --show-current)
SHA=$(git rev-parse HEAD | cut -c1-6)
LOCAL_TAG_NAME="$BRANCH.$SHA"

OUTPUT_FILE=${OUTPUT_FILE:-output.yaml}
TAG_NAME=${TAG_NAME:-"$LOCAL_TAG_NAME"}

IMAGE="$REPO_BASE/$IMAGE_NAME:$TAG_NAME"
LATEST_IMAGE="$REPO_BASE/$IMAGE_NAME:latest"
echo "IMAGE=$IMAGE"
DOCKER_FILE=${DOCKER_FILE:-"Dockerfile"}
PUSH_IMAGE_ONLY=${PUSH_IMAGE_ONLY:-"false"}
ARGUMENTS=${ARGUMENTS:-""}

if [ "$CLOUD" = "aws" ] || [ "$SUB_REPOSITORY" = "on_prem" ]; then
  aws ecr describe-repositories --repository-names "$REPO_BASE/$IMAGE_NAME" | jq || aws ecr create-repository --repository-name $REPOSITORY | jq
fi

if [ "$PUSH_IMAGE_ONLY" = "false" ]
then
    docker build $ARGUMENTS -t $IMAGE -t $LATEST_IMAGE -f $DOCKER_FILE .
else 
    echo "Skipped building images due to PUSH_IMAGE_ONLY=$PUSH_IMAGE_ONLY"
fi
if [ "$SHOULD_PUSH" = "true" ]; then
  docker push $IMAGE
fi
if [[ -n "${GITHUB_WORKSPACE}" ]]; then
    echo "  $IMAGE_NAME: $IMAGE"  >> "$GITHUB_WORKSPACE/$OUTPUT_FILE"
fi