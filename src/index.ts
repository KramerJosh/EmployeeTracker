import inquirer from 'inquirer';

const API_BASE_URL = 'http://localhost:3001/api';  // this might need to get updated 

// Function to prompt the user for employee data
async function createEmployee() {
  const answers = await inquirer.prompt([
    { type: 'input', name: 'first_name', message: 'Enter first name: ' },
    { type: 'input', name: 'last_name', message: 'Enter last name: ' },
    { type: 'input', name: 'role_id', message: 'Enter role ID: ' },
    { type: 'input', name: 'manager_id', message: 'Enter manager ID: ' },
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
    console.log('Employee created successfully:', data);
  } catch (error) {
    console.error('Error creating employee:');
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
  } catch (error) {
    console.error('Error creating department:');
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
  } catch (error) {
    console.error('Error creating employee:');
  }
}
// Function to prompt the user to choose between creating an employee or a department
async function main() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['Create an employee', 'Create a department', 'Update an employee role'],
    },
  ]);

  if (action === 'Create an employee') {
    await createEmployee();
  } else if (action === 'Create a department') {
    await createDepartment();
  } else if (action === 'Update an employee role') {
    await updateEmployee();
  }
}

// Run the main function
main();