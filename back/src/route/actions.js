//* Підключаю технолгію Express.js
const express = require('express')

//*  Підключаю вбудований роутер для маршрутизації
const router = express.Router()

//* Підключаю файли класів
const { Customer } = require('../class/user')
const { Notify } = require('../class/notification')
const { Transaction } = require('../class/transaction')

Transaction.create({
  type: 'receive',
  amount: 150,
  source: 'STRIPE',
})
Transaction.create({
  type: 'send',
  amount: 10,
  source: 'girlfriend2@gmail.com',
})
Notify.create({
  action: 'notification',
  name: 'Bank Corp.',
  info: 'Congradulations! Enjoy to use our bank.',
})
Notify.create({
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
//==================================================
router.get('/notifications', function (req, res) {
  res.json(Notify.getList())
})
//===================================================
router.get('/notifications/update', function (req, res) {
  const id = Number(req.query.id)
  try {
    const updated = Notify.update(id)
    if (!updated) {
      throw new Error('Notification not found')
    }
    res.json({ success: true })
  } catch (e) {
    console.error('Error updating ifUnread status: ', e)
  }
})
//===================================================
router.post('/receive', function (req, res) {
  const { amount, source, type } = req.body
  if (!amount) {
    return res.status(400).json({
      message: 'Enter the amount !',
    })
  }
  try {
    const newTransaction = Transaction.create({
      type,
      amount,
      source,
    })
    console.log(newTransaction)
    return res.status(200).json({
      message: 'Success!',
      newTransaction,
    })
  } catch (e) {
    return res.status(400).json({
      message: 'Error. Transaction is not comleted.',
      field: 'data',
    })
  }
})
//===================================================

router.post('/settings', function (req, res) {
  const { currentData, typeNewData, newData, customerId } =
    req.body
  console.log(currentData, newData, customerId)
  try {
    const user = Customer.getByData(customerId)
    console.log(user)
    if (!user) {
      return res.status(400).json({
        message:
          'User with this data is absent in the server storage.',
        field: 'data',
      })
    } else if (user.password !== currentData) {
      return res.status(400).json({
        message: 'Current data is not correct.',
        field: 'password',
      })
    }
    Customer.updateData(user, typeNewData, newData)
    console.log('Updated user: ', user)
    return res.status(200).json({
      message: 'Updated successful!',
    })
  } catch (e) {
    return res.status(400).json({
      message: 'Error, data not updated',
      field: 'data',
    })
  }
})

//===================================================

module.exports = router
