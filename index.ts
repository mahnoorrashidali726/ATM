import inquirer,{Answers} from "inquirer"


interface ComplexInterface {
    name:string,
    age:number,
    isStudent:boolean,
    interests:string[]
    address:{
      street:string
      city:string
      postalCode:string
     }
     grades:{
      math:{
        midterm:number
        final:number
      }
      Canvas:{
        midterm: number
        final: number
      }
     }
     contact: {
      email:string
      phone: string
     }
     tuple:[number,string,boolean ],
     tuple1:(x:number) => number

}
const complexObject:ComplexInterface = {
    name: "John Doe",
    age: 30,
    isStudent: false,
    interests: ["programming", "music", "hiking"],
    address: {
      street: "123 Main St",
      city: "Exampleville",
      postalCode: "12345",
    },
    grades: {
      math: {
        midterm: 85,
        final: 92,
      },
      Canvas:{
        midterm: 78,
        final: 88,
      },
    },
    contact: {
      email: "john.doe@example.com",
      phone: "+1234567890",
    },
    tuple: [1, "two", true],
    tuple1: function (x:number) {
      return x * 2;
    },
  };


  interface accountInterface {
    accountNumber : string,
    pin:string,
    balance:number,
    transactions:string[]
}

let account:accountInterface = {
    accountNumber:"PKMEZN0407",
    pin:"1234",
    balance:1000,
    transactions:[]
}

async function login():Promise<void> {

    let userAccountLogin:Answers = await inquirer.prompt([
        {
            name:"accountNumber",
            type:"string",
            message:"Enter Your Account Number"
        },
        {
            name:"pin",
            type:"string",
            message:"Enter Your Pin"
        }
    ]) 

    if(userAccountLogin.accountNumber === account.accountNumber && userAccountLogin.pin === account.pin) {
        console.log("Login Successful")
        actionToPerform()
    }else {
        console.error(`Incorrect Login Details`)
    }


}


function logout() {
    console.log("User Logout Successfully");
    
}

function checkBalance() {
    console.log(`Account Balance is ${account.balance}`);
    actionToPerform()
}

async function withdraw():Promise<void> {
    let withdrawAmount = await inquirer.prompt([
        {
            name:"amount",
            type:'number',
            message:`Enter the amount you want to Withdraw`,
            validate:(input) => (input > 0 && input < account.balance)
        }
    ])

    let amount = withdrawAmount.amount
    account.balance -= amount
    console.log(`${amount} has been successfully deducted from your balance`);
    account.transactions.push(amount)
    actionToPerform()


}


function viewTransactions() {
    if(account.transactions.length > 0) {
        for (let i = 0; i < account.transactions.length; i++) {
            const element = account.transactions[i];
            console.log(element);   
        }
    }else {
        console.warn('No Transactions Yet')
    }
    actionToPerform();
}



async function actionToPerform():Promise<void> {
        let actions = await inquirer.prompt([
            {
                name:"action",
                type:"list",
                message:"What would you like to do?",
                choices:["Check Balance","Withdraw","View Transactions","Logout"]
            }
        ])

        switch (actions.action) {
            case "Check Balance":
                checkBalance()
                break;
            case "Withdraw":
                withdraw()   
                break; 
            case "View Transactions":
                viewTransactions()
                break;
            case "Logout":
                logout()    
                break;
            default:
                actionToPerform()
                break;
        }
}





login()