import inquirer from 'inquirer';

const API_BASE_URL = 'http://localhost:3001/api';  // this might need to get updated  

// view all employees
async function viewAllEmployees() {
  try {
    const response = await fetch(`${API_BASE_URL}/employee`, {
      method: 'GET', 
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // if there's a data object (after the message potentially), in the api response
    if (data && Array.isArray(data.data)) {
      console.table(data.data); // Display the array inside the 'data' property
    } else {
      console.error("Unexpected data structure:", data); //just in case we get something funky
    }

    main();
  } catch (error) {
    console.error('Error displaying employee data:' , error); //catch all error
    main();
  }
}


// view all roles
async function viewAllRoles() {
  try {
    const response = await fetch(`${API_BASE_URL}/roles`, {
      method: 'GET', 
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // if there's a data object (after the message potentially), in the api response
    if (data && Array.isArray(data.data)) {
      console.table(data.data); // Display the array inside the 'data' property
    } else {
      console.error("Unexpected data structure:", data); //just in case we get something funky
    }

    main();
  } catch (error) {
    console.error('Error displaying employee role data:' , error); //catch all error
    main();
  }
}

// view all employees
async function viewAllDepartments() {
  try {
    const response = await fetch(`${API_BASE_URL}/depts`, {
      method: 'GET', 
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // if there's a data object (after the message potentially), in the api response
    if (data && Array.isArray(data.data)) {
      console.table(data.data); // Display the array inside the 'data' property
    } else {
      console.error("Unexpected data structure:", data.data); //just in case we get something funky
    }

    main();
  } catch (error) {
    console.error('Error displaying departments data:' , error); //catch all error
    main();
  }
}
// Function to prompt the user for role data
async function createEmployee() {
  const answers = await inquirer.prompt([
    { type: 'input', name: 'first_name', message: 'Please enter Employee first name: ' },
    { type: 'input', name: 'last_name', message: 'Please enter Employee last name: ' },
    { type: 'input', name: 'role_id', message: 'Enter a role ID: ' },
    { type: 'input', name: 'manager_id', message: 'Enter a manager ID: ' },
  ]);

  try {
    const response = await fetch(`${API_BASE_URL}/new-employee`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Employee created successfully:', data.data);
    main();
  } catch (error) {
    console.error('Error creating employee:');
    main();
  }
}




// Function to prompt the user for role data
async function createRole() {
  const answers = await inquirer.prompt([
    { type: 'input', name: 'title', message: 'Please enter Job Title: ' },
    { type: 'input', name: 'salary', message: 'Enter a Salary: ' },
    { type: 'input', name: 'department_id', message: 'Enter a department ID: ' },
  ]);

  try {
    const response = await fetch(`${API_BASE_URL}/new-role`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Role created successfully:', data);
    main();
  } catch (error) {
    console.error('Error creating role:');
    main();
  }
}


// Function to prompt the user for department data
async function createDepartment() {
  const answers = await inquirer.prompt([
    { type: 'input', name: 'name', message: 'Enter department name: ' },
  ]);

  try {
    const response = await fetch(`${API_BASE_URL}/new-dept`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Department created successfully:', data);
    main();
  } catch (error) {
    console.error('Error creating department:');
    main();
  }
}

// Function to prompt the user to update Employee Role
async function updateEmployee() {
  const answers = await inquirer.prompt([
    { type: 'input', name: 'id', message: 'Enter an employee ID: ' },
    { type: 'input', name: 'role', message: 'Enter a new role ID: ' },
  ]);

  try {
    const response = await fetch(`${API_BASE_URL}/employee`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Employee created successfully:', data);
    main();
  } catch (error) {
    console.error('Error updating employee:');
    main();
  }
}

// Function to prompt the user to delete Employee 
async function deleteEmployee() {
  const answers = await inquirer.prompt([
    { type: 'input', name: 'id', message: 'Enter an employee ID: ' },
  ]);
  const employeeID = answers.id;

  try {
    const response = await fetch(`${API_BASE_URL}/employee/${employeeID}`, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify(employeeID), - keeping this in causes an error
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Employee deleted successfully:', data);
    main();
  } catch (error) {
    console.error(`Error deleting employee:${employeeID}`);
    main();
  }
}

function exitHolodeck() {
  console.log('Exiting...');
  process.exit(); // This will immediately exit the program
}

// Main Menu
async function main() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['Create an employee', 
                'Create a department', 
                'Create a new role', 
                'Update an employee role', 
                'Delete an employee', 
                'View all Employees', 
                'View all Roles', 
                'View all Departments', 
                'Exit'],
    },
  ]);

  if (action === 'Create an employee') {
    await createEmployee();
  } else if (action === 'Create a department') {
    await createDepartment();
  } else if (action === 'Update an employee role') {
    await updateEmployee();
  } else if (action === 'Delete an employee') {
    await deleteEmployee();
  } else if (action === 'View all Employees') {
    await viewAllEmployees();
  } else if (action === 'View all Roles') {
    await viewAllRoles();
  } else if (action === 'View all Departments') {
    await viewAllDepartments();
  } else if (action === 'Create a new role') {
    await createRole();
  } else if (action === 'Exit') {
    exitHolodeck();
  }
}


// Run the main function
main();

