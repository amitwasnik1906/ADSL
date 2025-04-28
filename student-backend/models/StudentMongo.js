const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  address: String,
  course: String,
  rollNumber: Number,
});

const Student = mongoose.model('Student', studentSchema);

async function saveMongoStudent(data) {
  const student = new Student(data);
  await student.save();
}

module.exports = { saveMongoStudent };
