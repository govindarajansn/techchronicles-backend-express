function checkHealth(req, res) {
  res.status(200).send({ message: "SERVER RUNNING" });
}

export default checkHealth;
