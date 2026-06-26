const path = require('path');
const { createClient } = require(path.join(__dirname, '../node_modules/@supabase/supabase-js'));
const fs = require('fs');

// Manually parse .env.local file
const envPath = path.join(__dirname, '../.env.local');
if (!fs.existsSync(envPath)) {
  console.error("Error: .env.local file not found.");
  process.exit(1);
}
const envContent = fs.readFileSync(envPath, 'utf8');

const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] ? match[2].trim() : '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.substring(1, value.length - 1);
    }
    env[match[1]] = value;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

// Read arguments or use defaults
const email = process.argv[2] || 'admin@krissdevhub.dev';
const password = process.argv[3] || 'AdminPassword123!';

async function saveAdminUser() {
  console.log(`Checking if user ${email} already exists...`);
  
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
  
  if (listError) {
    console.error("Error checking users list:", listError.message);
    process.exit(1);
  }

  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (existingUser) {
    console.log(`User already exists. Updating password for ${email}...`);
    const { data, error } = await supabase.auth.admin.updateUserById(existingUser.id, {
      password: password,
      email_confirm: true
    });

    if (error) {
      console.error("Error updating user password:", error.message);
    } else {
      console.log("--------------------------------------------------");
      console.log("SUCCESS: Password Updated Successfully!");
      console.log("--------------------------------------------------");
      console.log(`Email ID: ${data.user.email}`);
      console.log(`Password: ${password}`);
      console.log("--------------------------------------------------");
    }
  } else {
    console.log(`Creating new admin account for ${email}...`);
    const { data, error } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true
    });

    if (error) {
      console.error("Error creating admin user:", error.message);
    } else {
      console.log("--------------------------------------------------");
      console.log("SUCCESS: Admin User Created Successfully!");
      console.log("--------------------------------------------------");
      console.log(`Email ID: ${data.user.email}`);
      console.log(`Password: ${password}`);
      console.log("--------------------------------------------------");
    }
  }
}

saveAdminUser();
