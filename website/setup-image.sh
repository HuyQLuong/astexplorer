set -e
BRANCH=$(git branch --show-current)
SHA=$(git rev-parse HEAD | cut -c1-6)
LOCAL_TAG_NAME="$BRANCH.$SHA"
ECR=${ECR:-"326348232034.dkr.ecr.ap-southeast-1.amazonaws.com"}
NAMESPACE=${NAMESPACE:-"de"}
OUTPUT_FILE=${OUTPUT_FILE:-output.yaml}
TAG_NAME=${TAG_NAME:-"$LOCAL_TAG_NAME"}
REPOSITORY="$NAMESPACE/$IMAGE_NAME"
if [ "$SUB_REPOSITORY" != "" ]; then
  REPOSITORY="$SUB_REPOSITORY/$REPOSITORY"
fi
IMAGE="$ECR/$REPOSITORY:$TAG_NAME"
LATEST_IMAGE="$ECR/$REPOSITORY:latest"
echo "IMAGE=$IMAGE"
DOCKER_FILE=${DOCKER_FILE:-"Dockerfile"}
PUSH_IMAGE_ONLY=${PUSH_IMAGE_ONLY:-"false"}
ARGUMENTS=${ARGUMENTS:-""}
aws ecr describe-repositories --repository-names $REPOSITORY | jq || aws ecr create-repository --repository-name $REPOSITORY | jq
if [ "$PUSH_IMAGE_ONLY" = "false" ]
then
    docker build $ARGUMENTS -t $IMAGE -t $LATEST_IMAGE -f $DOCKER_FILE .
else 
    echo "Skipped building images due to PUSH_IMAGE_ONLY=$PUSH_IMAGE_ONLY"
fi

docker push $IMAGE 
if [[ -n "${GITHUB_WORKSPACE}" ]]; then
    echo "  $IMAGE_NAME: $IMAGE"  >> "$GITHUB_WORKSPACE/$OUTPUT_FILE"
fi