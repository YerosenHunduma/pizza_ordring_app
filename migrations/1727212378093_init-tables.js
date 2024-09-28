exports.up = (pgm) => {
    pgm.createTable('users', {
        id: { type: 'serial', primaryKey: true },
        name: { type: 'varchar(255)' },
        email: { type: 'varchar(255)', notNull: true, unique: true },
        password: { type: 'varchar(255)', notNull: true },
        phone_number: { type: 'varchar(20)', notNull: true },
        role: { type: 'varchar(50)', notNull: true },
        location: { type: 'varchar(255)', notNull: true },
        created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') }
    });

    pgm.createTable('restaurants', {
        id: { type: 'serial', primaryKey: true },
        restaurant_name: { type: 'varchar(255)', notNull: true },
        address: { type: 'text', notNull: true },
        logo: { type: 'varchar(255)' },
        owner_id: { type: 'integer', references: '"users"', onDelete: 'SET NULL', onUpdate: 'CASCADE' },
        created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') }
    });

    pgm.createTable('pizzas', {
        id: { type: 'serial', primaryKey: true },
        name: { type: 'varchar(100)', notNull: true },
        restaurant_id: { type: 'integer', notNull: true, references: '"restaurants"', onDelete: 'CASCADE', onUpdate: 'CASCADE' },
        created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') }
    });

    pgm.createTable('toppings', {
        id: { type: 'serial', primaryKey: true },
        name: { type: 'varchar(100)', notNull: true },
        restaurant_id: { type: 'integer', notNull: true, references: '"restaurants"', onDelete: 'CASCADE', onUpdate: 'CASCADE' },
        created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') }
    });

    pgm.createTable('pizza_toppings', {
        pizza_id: { type: 'integer', notNull: true, references: '"pizzas"', onDelete: 'CASCADE', onUpdate: 'CASCADE' },
        topping_id: { type: 'integer', notNull: true, references: '"toppings"', onDelete: 'CASCADE', onUpdate: 'CASCADE' },
        created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') }
    });

    pgm.addConstraint('pizza_toppings', 'pk_pizza_toppings', {
        primaryKey: ['pizza_id', 'topping_id']
    });

    pgm.createTable('orders', {
        id: { type: 'serial', primaryKey: true },
        user_id: { type: 'integer', notNull: true, references: '"users"', onDelete: 'CASCADE', onUpdate: 'CASCADE' },
        pizza_id: { type: 'integer', notNull: true, references: '"pizzas"', onDelete: 'CASCADE', onUpdate: 'CASCADE' },
        status: { type: 'varchar(50)', notNull: true, default: 'pending' },
        created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') }
    });

    pgm.createIndex('pizzas', 'restaurant_id');
    pgm.createIndex('toppings', 'restaurant_id');
    pgm.createIndex('orders', 'user_id');
    pgm.createIndex('orders', 'pizza_id');
};

exports.down = (pgm) => {
    pgm.dropTable('orders');
    pgm.dropTable('pizza_toppings');
    pgm.dropTable('toppings');
    pgm.dropTable('pizzas');
    pgm.dropTable('restaurants');
    pgm.dropTable('users');
};
