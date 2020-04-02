module.exports = {
  create: (req, res) => {
    const db = req.app.get("db");
    const { name, description, price, image_url } = req.body;

    db.create_product([name, description, price, image_url])
      .then(() => res.sendStatus(200))
      .catch(error => {
        res.status(500).send({ errorMessage: "Oops! Something went wrong" });
        console.log(error);
      });
  },
  getOne: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.read_product(id)
      .then(response => res.status(200).send(response))
      .catch(error => {
        res.status(500).send({ errorMessage: "Oops! Something went wrong" });
        console.log(error);
      });
  },
  getAll: (req, res) => {
    const db = req.app.get("db");
    db.read_products()
      .then(response => res.status(200).send(response))
      .catch(error => {
        res.status(500).send({ errorMessage: "Oops! Something went wrong" });
        console.log(error);
      });
  },
  update: (req, res, next) => {
    const db = req.app.get("db");
    const { params, query } = req;

    db.update_product([params.id, query.desc])
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({
          errorMessage:
            "Oops! Something went wrong. Our engineers have been informed!"
        });
        console.log(err);
      });
  },
  delete: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.delete_product(id)
      .then(() => res.sendStatus(200))
      .catch(error => {
        res.status(500).send({ errorMessage: "Oops! Something went wrong" });
        console.log(error);
      });
  }
};
