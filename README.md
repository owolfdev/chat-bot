test the api

curl -X POST http://localhost:3000/api/chat \
 -H "Content-Type: application/json" \
 -d '{"message": "how many planets are estimated to be in the milky way galaxy?"}'
