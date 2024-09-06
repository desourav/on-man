# install/update homebrew
brew -v
if [ $? == 0 ]; then
    echo "brew installed"
else 
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# install kind
brew install kind
# create cluster
kind delete cluster
kind create cluster
# connect to cluster
kubectl cluster-info --context kind-kind