kubectl apply -f kubernetes/mysql.yaml
kubectl get po -n on-man
pod=`kubectl get po -n on-man | grep mysql | awk '{printf $1}'`
kubectl wait --for=condition=Ready pod/${pod} -n on-man
kubectl get svc -n on-man