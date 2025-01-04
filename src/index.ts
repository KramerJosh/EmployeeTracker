import inquirer from "inquirer";

const API_BASE_URL = "http://localhost:3001/api"; // this might need to get updated

// view all employees
async function viewAllEmployees() {
  try {
    const response = await fetch(`${API_BASE_URL}/employee`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
    console.error("Error displaying employee data:", error); //catch all error
    main();
  }
}

// view all roles
async function viewAllRoles() {
  try {
    const response = await fetch(`${API_BASE_URL}/roles-display`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
    console.error("Error displaying employee role data:", error); //catch all error
    main();
  }
}

// view all employees
async function viewAllDepartments() {
  try {
    const response = await fetch(`${API_BASE_URL}/depts`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
    console.error("Error displaying departments data:", error); //catch all error
    main();
  }
}

// Function to prompt to create an employee
async function createEmployee() {
  try {
    // Fetch roles from the API
    const rolesResponse = await fetch(`${API_BASE_URL}/roles`);
    if (!rolesResponse.ok) {
      throw new Error(`Failed to fetch roles. Status: ${rolesResponse.status}`);
    }
    const rolesData = await rolesResponse.json();
    const roles = rolesData.data.map((role: { title: any; id: any }) => ({
      name: role.title,
      value: role.id,
    }));

    // Fetch employees to populate managers
    const employeesResponse = await fetch(`${API_BASE_URL}/employee`);
    if (!employeesResponse.ok) {
      throw new Error(
        `Failed to fetch employees. Status: ${employeesResponse.status}`
      );
    }
    const employeesData = await employeesResponse.json();
    const employees = employeesData.data;

    // Map employees for the manager selection dropdown
    const managers = employees.map(
      (employee: { first_name: any; last_name: any; id: any }) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      })
    );

    // Add a 'None' option for employees without a manager
    managers.unshift({ name: "None", value: null });

    // Prompt the user with roles, managers, and other details
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "first_name",
        message: "Please enter Employee first name: ",
      },
      {
        type: "input",
        name: "last_name",
        message: "Please enter Employee last name: ",
      },
      {
        type: "list",
        name: "role_id",
        message: "Select a role:",
        choices: roles,
      },
      {
        type: "list",
        name: "manager_id",
        message: "Select a manager:",
        choices: managers,
      },
    ]);

    // Send the data to the server
    const response = await fetch(`${API_BASE_URL}/new-employee`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Employee created successfully:", data.data);
    main();
  } catch (error) {
    console.error("Error creating employee:", error);
    main();
  }
}

// Function to prompt the user for role data
async function createRole() {
  // Fetch departments from the API
  const deptsResponse = await fetch(`${API_BASE_URL}/depts`);
  if (!deptsResponse.ok) {
    throw new Error(`Failed to fetch depts. Status: ${deptsResponse.status}`);
  }
  const deptsData = await deptsResponse.json();
  const depts = deptsData.data.map((dept: { name: any; id: any }) => ({
    name: dept.name,
    value: dept.id,
  })); 

  const answers = await inquirer.prompt([
    { type: "input", name: "title", message: "Please enter Job Title: " },
    { type: "input", name: "salary", message: "Enter a Salary: " },
    {
      type: "list",
      name: "department_id",
      message: "Select a department: ",
      choices: depts,
    },
  ]);

  try {
    const response = await fetch(`${API_BASE_URL}/new-role`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Role created successfully:", data);
    main();
  } catch (error) {
    console.error("Error creating role:");
    main();
  }
}

// Function to prompt the user for department data
async function createDepartment() {
  const answers = await inquirer.prompt([
    { type: "input", name: "name", message: "Enter department name: " },
  ]);

  try {
    const response = await fetch(`${API_BASE_URL}/new-dept`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Department created successfully:", data);
    main();
  } catch (error) {
    console.error("Error creating department:");
    main();
  }
}

// Function to prompt the user to update Employee Role
async function updateEmployee() {
  const employeesResponse = await fetch(`${API_BASE_URL}/employee`);
  if (!employeesResponse.ok) {
    throw new Error(
      `Failed to fetch employees. Status: ${employeesResponse.status}`
    );
  }
  const employeesData = await employeesResponse.json();
  const employees = employeesData.data.map((employee: { first_name: any; last_name: any, id: any }) => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
}));
  // Fetch roles from the API
  const rolesResponse = await fetch(`${API_BASE_URL}/roles`);
  if (!rolesResponse.ok) {
    throw new Error(`Failed to fetch roles. Status: ${rolesResponse.status}`);
  }
  const rolesData = await rolesResponse.json();
  const roles = rolesData.data.map((role: { title: any; id: any }) => ({
    name: role.title,
    value: role.id,
  }));

  // change both of the below to list, and populate with the above
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Select an employee: ",
      choices: employees,
    },
    { type: "list", name: "role", message: "Chose a new role : ", choices: roles,},
  ]);

  try {
    const response = await fetch(`${API_BASE_URL}/employee`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Employee created successfully:", data);
    main();
  } catch (error) {
    console.error("Error updating employee:");
    main();
  }
}

// Function to prompt the user to delete Employee
async function deleteEmployee() {
  const employeesResponse = await fetch(`${API_BASE_URL}/employee`);
  if (!employeesResponse.ok) {
    throw new Error(
      `Failed to fetch employees. Status: ${employeesResponse.status}`
    );
  }
  const employeesData = await employeesResponse.json();
  const employees = employeesData.data.map((employee: { first_name: any; last_name: any, id: any }) => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
}));


  const answers = await inquirer.prompt([
    { type: "list", name: "id", message: "Select an employee: ", choices: employees,},
  ]);
  const employeeID = answers.id;

  try {
    const response = await fetch(`${API_BASE_URL}/employee/${employeeID}`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(employeeID), - keeping this in causes an error
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Employee deleted successfully:", data);
    main();
  } catch (error) {
    console.error(`Error deleting employee:${employeeID}`);
    main();
  }
}

function exitHolodeck() {
  console.log("Exiting...");
  process.exit(); // This will immediately exit the program
}

// Main Menu
async function main() {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "Create an employee",
        "Create a department",
        "Create a new role",
        "Update an employee role",
        "Delete an employee",
        "View all Employees",
        "View all Roles",
        "View all Departments",
        "Exit",
      ],
    },
  ]);

  if (action === "Create an employee") {
    await createEmployee();
  } else if (action === "Create a department") {
    await createDepartment();
  } else if (action === "Update an employee role") {
    await updateEmployee();
  } else if (action === "Delete an employee") {
    await deleteEmployee();
  } else if (action === "View all Employees") {
    await viewAllEmployees();
  } else if (action === "View all Roles") {
    await viewAllRoles();
  } else if (action === "View all Departments") {
    await viewAllDepartments();
  } else if (action === "Create a new role") {
    await createRole();
  } else if (action === "Exit") {
    exitHolodeck();
  }
}

// Run the main function
main();
