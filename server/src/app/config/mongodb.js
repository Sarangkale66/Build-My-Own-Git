import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.DB_URL) {
      throw new Error('DB_URL environment variable is required');
    }

    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true);
      console.log('🔄 Attempting to connect to MongoDB...');
    }

    const connection = await mongoose.connect(process.env.DB_URL);

    console.log(`✅ MongoDB connected successfully!`);
    console.log(`📊 Database: ${connection.connection.name}`);
    console.log(`🌐 Host: ${connection.connection.host}:${connection.connection.port}`);

    if (process.env.NODE_ENV === 'development') {
      console.log(`🏊‍♂️ Connection Pool - Max: ${connectionOptions.maxPoolSize}, Min: ${connectionOptions.minPoolSize}`);
    }

    return connection;

  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);

    if (process.env.NODE_ENV === 'production') {
      console.error('🚨 Critical: Database connection failed in production. Exiting...');
      process.exit(1);
    } else {
      console.error('Full error details:', error);
    }

    throw error;
  }
};

mongoose.connection.on('connected', () => {
  console.log('🟢 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (error) => {
  console.error('🔴 Mongoose connection error:', error.message);

  if (process.env.NODE_ENV === 'production') {
    // Send alert to monitoring service
  }
});

mongoose.connection.on('disconnected', () => {
  console.log('🟡 Mongoose disconnected from MongoDB');
});

process.on('SIGINT', async () => {
  try {
    console.log('\n🔄 Received SIGINT. Closing MongoDB connection gracefully...');
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during MongoDB disconnection:', error.message);
    process.exit(1);
  }
});

process.on('SIGTERM', async () => {
  try {
    console.log('\n🔄 Received SIGTERM. Closing MongoDB connection gracefully...');
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during MongoDB disconnection:', error.message);
    process.exit(1);
  }
});

const checkDatabaseHealth = async () => {
  try {
    const isConnected = mongoose.connection.readyState === 1;

    if (!isConnected) {
      throw new Error('Database not connected');
    }

    await mongoose.connection.db.admin().ping();

    return {
      status: 'healthy',
      database: mongoose.connection.name,
      host: mongoose.connection.host,
      port: mongoose.connection.port,
      readyState: mongoose.connection.readyState
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.message,
      readyState: mongoose.connection.readyState
    };
  }
};

const retryConnection = async (retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`🔄 Connection attempt ${i + 1}/${retries}`);
      await connectDB();
      return;
    } catch (error) {
      console.error(`❌ Connection attempt ${i + 1} failed:`, error.message);

      if (i === retries - 1) {
        console.error('🚨 All connection attempts failed');
        throw error;
      }

      console.log(`⏳ Retrying in ${delay / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 1.5;
    }
  }
};

export {
  connectDB,
  checkDatabaseHealth,
  retryConnection
};