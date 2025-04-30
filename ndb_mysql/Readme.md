#### Step 3: Access the MySQL container

Access the MySQL container using the following command:

```bash
docker exec -it mysql1 mysql -u root -p
```

---

#### Step 4: Enter the default password

When prompted, enter the default password specified in the `docker-compose.yml` file.

---

#### Step 5: Create and use a new database

Run the following SQL commands to create a new database and switch to it:

```sql
CREATE DATABASE test_cluster;
USE test_cluster;
```

---

#### Step 6: Create a sample table and insert data

Create a table named `users` and insert sample data into it:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=ndbcluster;

INSERT INTO users (name, email) VALUES
('alice', 'alice@example.com');
```

---

#### Step 7: Fetch data from the table

Retrieve the data from the `users` table using:

```sql
SELECT * FROM users;
```

---

#### Step 8: Stop a specific container

You can stop any container using the following command:

```bash
docker stop <container_name>
```

Replace `<container_name>` with the name of the container you want to stop.

---

#### Step 9: Test fault tolerance

Even after stopping a node, the query from Step 7 should still work, demonstrating the fault tolerance of the NDB cluster.