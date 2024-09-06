kubectl apply -f kubernetes/ontology-manager.yaml
pod=`kubectl get po -n on-man | grep ontology-manager | awk '{printf $1}'`
kubectl wait --for=condition=Ready pod/${pod} -n on-man
# port-forward the application
kubectl port-forward -n on-man svc/ontology-manager-service 4000:4000 &