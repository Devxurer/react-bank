//* Підключаю технолгію Express.js
const express = require('express')

//*  Підключаю вбудований роутер для маршрутизації
const router = express.Router()

//* Підключаю файли класів
const { User } = require('../class/user')
const { Notification } = require('../class/notification')
const { Transaction } = require('../class/transaction')

Transaction.create({
  type: 'send',
  amount: 1000,
  source: 'bobby',
})

Transaction.create({
  type: 'send',
  amount: 100,
  source: 'mama',
})

Notification.create({
  action: 'notification',
  name: 'Bank Corp.',
  info: 'Congradulations! Enjoy to use our bank.',
})

Notification.create({
  action: 'sign up',
  name: 'anonimous@anonim.com',
  info: '(Linux)',
})

//===================================================

router.get('/balance', function (req, res) {
  res.json({
    balance: Transaction.getBalance(),
    list: Transaction.getList().reverse(),
    notifications: Notification.getUnread().length,
  })
})

//===================================================

router.post('/send', function (req, res) {
  const { source, amount, type } = req.body

  if (!source || !amount) {
    return res.status(400).json({
      message: 'You have to fill all fields.',
    })
  }

  try {
    const balance = Transaction.getBalance()

    if (type === 'send' && amount > balance) {
      return res.status(400).json({
        message:
          'Your balance is insufficient for the transaction',
        field: 'data',
      })
    }

    const newTransaction = Transaction.create({
      source,
      amount,
      type,
    })
    console.log(newTransaction)

    return res.status(200).json({
      message: 'Success',
      newTransaction,
    })
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    })
  }
})

//===================================================

router.get('/transaction', function (req, res) {
  const id = Number(req.query.id)

  res.json({
    info: Transaction.getById(id),
  })
})

//===================================================
module.exports = router
