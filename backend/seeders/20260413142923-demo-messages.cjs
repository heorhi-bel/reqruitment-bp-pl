'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('messages', [
      {
        message: 'Witaj w aplikacji wiadomości!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        message: 'To jest przykładowa wiadomość numer dwa.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        message: 'Sequelize migracje działają poprawnie.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('messages', null, {});
  },
};