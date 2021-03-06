const Transaction = require('./transactionsModel');

exports.get = function(req, res) {
  Transaction.find(
    {
      user: req.user._id,
      // date: {
      //   $gte: req.query.start,
      //   $lt: req.query.end
      // }
    },
    (err, transactions) => {
      if (err) {
        res.send(err);
      }
      res.status(200).json(transactions);
    }
  );
};

exports.post = function(req, res) {
  const transaction = new Transaction();
  transaction.name = req.body.name;
  transaction.amount = req.body.amount;
  transaction.date = req.body.date;
  transaction.user = req.user._id;

  transaction.save(err => {
    if (err) {
      res.send(err);
    }
    res.json(transaction);
  });
};

exports.getOne = function(req, res) {
  Transaction.findById(req.params.id, (err, transaction) => {
    if (err) {
      res.send(err);
    }

    res.json(transaction);
  });
};

exports.put = function(req, res) {
  Transaction.findById(req.params.id, (err, transaction) => {
    if (err) {
      res.send(err);
    }

    transaction.name = req.body.name;
    transaction.amount = req.body.amount;
    transaction.date = req.body.date;

    transaction.save(err => {
      if (err) {
        res.send(err);
      }
      res.json(transaction);
    });
  });
};

exports.delete = function(req, res) {
  Transaction.remove(
    {
      _id: req.params.id,
    },
    (err, transaction) => {
      if (err) {
        res.send(err);
      }
      res.json(transaction);
    }
  );
};
