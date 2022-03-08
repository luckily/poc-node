import { db, Member, Order, transactionRepository } from "./models";

const main = async() => {
  try {
    db.sync();

    await transactionRepository.transaction(async(t) => {
      const member = new Member({
        firstName: 'joel',
        lastName: 'zhong',
      });

      await member.save({transaction: t});

      const order = new Order({
        price: 151,
        productName: 'vip',
      });

      await order.save({transaction: t});
    });

    process.exit(0);
  } catch (err) {
    console.error(err);
  }
};

main();