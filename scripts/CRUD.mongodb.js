// коннекшн стринга
// mongodb://127.0.0.1:PORT/DB-NAME
// или
// mongodb+srv://LOGIN:PASSWORD@cluster0.ozlvdnp.mongodb.net/DB
db.users.insertOne({});

// ctrl + alt + s - запуск выделенных строчек
db.users.find();

// CREATE
// insertOne
db.users.insertOne({
  email: "test@test.test",
  password: "12345sakdnfdsokf",
  isMale: true,
  address: {
    countty: "UA",
    city: "ZP",
  },
  phoneNumbers: [
    '036547896',
    '06547876546',
    '1354897643433'
  ]
});

// insertMany
db.users.insertMany([
  {
    email: 'mail1@mail.com',
  },
  {
    email: 'mail2@mail.com',
  },
  {
    email: 'mail3@mail.com',
  },
  {
    email: 'mail4@mail.com',
  },
  {
    email: 'mail5@mail.com',
  },
]);

db.inventory.insertMany([
  { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
  { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "A" },
  { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
  { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
  { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" }
]);

// Read
// найти все записи в таблице / коллекции
db.inventory.find();
// все записи со status = D
db.inventory.find({ status: 'D' });
// все заказы с количеством больше 40
db.inventory.find({ qty: { $gt: 40 } });
// найти все journal, planner и paper
db.inventory.find({ item: { $in: ['journal', 'planner', 'paper'] } });
// все записи, у которых высота (h) больше 11
db.inventory.find({ 'size.h': { $gt: 11 } });
// все записи, у которых высота (h) больше 11 И status = D
// v1
db.inventory.find({ 'size.h': { $gt: 11 }, status: 'D' });
// v2
db.inventory.find({
  $and: [
    { 'size.h': { $gt: 11 } },
    { status: 'D' }
  ]
});
// все записи, у которых высота (h) больше 11 ИЛИ status = D
db.inventory.find({
  $or: [
    { 'size.h': { $gt: 11 } },
    { status: 'D' }
  ]
});
// все записи, у которых высота (h) больше 11сm ИЛИ status = A
db.inventory.find({
  $or: [
    { status: 'A' },
    {
      $and: [
        { 'size.h': { $gt: 11 } },
        { 'size.uom': 'cm' }
      ]
    }
  ]
});
// 
db.inventory.find({
  $or: [
    { status: 'A' },
    {
      'size.h': { $gt: 11 },
      'size.uom': 'cm'
    }
  ]
});

// всех юзеров, у которых есть поле money
db.users.find({
  money: { $exists: true }
});

/*
  возьмите и вставте данные инвентаря
  найдите мне все записи, в которых:
    - количество меньше или равно 50
    - статус равен A
    - ширина больше 16 ИЛИ высота мешьне 16

  найдите все записи в таблице юзеров у которых есть поля
  email и password
*/
// 1
db.inventory.find({ qty: { $lte: 50 } });
// 2
db.inventory.find({ status: 'A' });
// 3
db.inventory.find({
  $or: [
    { 'size.w': { $gt: 16 } },
    { 'size.h': { $lt: 16 } }
  ]
});
// 4
db.users.find({
  email: { $exists: true },
  password: { $exists: true }
});

// Update

db.inventory.insertMany([
  { item: "canvas", qty: 100, size: { h: 28, w: 35.5, uom: "cm" }, status: "A" },
  { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
  { item: "mat", qty: 85, size: { h: 27.9, w: 35.5, uom: "cm" }, status: "A" },
  { item: "mousepad", qty: 25, size: { h: 19, w: 22.85, uom: "cm" }, status: "P" },
  { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "P" },
  { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
  { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
  { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" },
  { item: "sketchbook", qty: 80, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
  { item: "sketch pad", qty: 95, size: { h: 22.85, w: 30.5, uom: "cm" }, status: "A" }
]);

// db.inventory.updateOne - обновляет первую подходящую запись
// db.inventory.updateMany - обновляет все подходящии записи
// изменить значени поля status с A на Accepted
db.inventory.updateMany(
  { status: 'A' }, // - фильтрация
  {  // - какие изменения выполняем
    $set: { status: 'Accepted' } // - устанавливает новое значение в указанное поле(я)
  }
);
// UPDATE inventory set status = 'Accepted' WHERE status = 'A'

// изменить значение поля status следующим образом
//  - P -> Processing
//  - D -> Done

db.inventory.find();


// Delete

db.inventory.drop(); // удаление таблицы

// DELETE FROM inventory
db.inventory.deleteMany(); // - удаляет все

// DELETE FROM inventory WHERE size.uom = 'in'
db.inventory.deleteMany({
  'size.uom': 'in'
});

// удалить всех пользователей, у которых нет или емейла или пароля