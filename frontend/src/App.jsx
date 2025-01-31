import { useEffect, useState } from 'react'
import { Wallet } from "./services/near-wallet";
import Form from './components/Form';
import SignIn from './components/SignIn';
import Messages from './components/Messages';
import { utils } from 'near-api-js';
import icon1 from './images/icon1.png'
import icon2 from './images/icon2.png'
import icon3 from './images/icon3.png'
import logo from './images/logo.png'

const CONTRACT_NAME = "jacobtest2.testnet"
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_NAME })


function App() {




  
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const initFunction = async () => {
      const isSignedIn = await wallet.startUp();
      const messages = await getLast10Messages();

      setIsSignedIn(isSignedIn);
      setMessages(messages.reverse());
    }
    initFunction();
  }, []);

  const getLast10Messages = async () => {
    const total_messages = await wallet.viewMethod({ contractId: CONTRACT_NAME, method: "total_messages" });
    const from_index = total_messages >= 10 ? total_messages - 10 : 0;
    return wallet.viewMethod({ contractId: CONTRACT_NAME, method: "get_messages", args: { from_index: String(from_index), limit: "10" } });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.elements)
    const policy_deductable = e.target.elements[1]
    const incident_date = e.target.elements[2]
    const policy_annual_premium = e.target.elements[3]
    const incident_type = e.target.elements[4]
    const collision_type = e.target.elements[5]
    const incident_severity = e.target.elements[6]
    const authorities_contacted = e.target.elements[7]
    const number_of_vehicles_involved = e.target.elements[8]
    const police_report_available = e.target.elements[9]
    const total_claim_amount = e.target.elements[10]
    const injury_claim = e.target.elements[11]
    const property_claim = e.target.elements[12]
    const vehicle_claim = e.target.elements[13]

     console.log(policy_deductable);
    fieldset.disabled = true;

    // Add message to the guest book
    const deposit = utils.format.parseNearAmount(donation.value);
    const account_Id = wallet.accountId;
    await wallet.callMethod({ contractId: CONTRACT_NAME, method: "claim", args: { 
      account_Id: account_Id, 
      policy_deductable: policy_deductable.value, 
      incident_date: incident_date.value      ,
      policy_annual_premium: policy_annual_premium.value,
      incident_type: incident_type.value,
      collision_type: collision_type.value,
      incident_severity: incident_severity.value,
      authorities_contacted: authorities_contacted.value,
      number_of_vehicles_involved: number_of_vehicles_involved.value,   
      police_report_available: police_report_available.value,
      total_claim_amount: total_claim_amount.value,
      injury_claim: injury_claim.value,
      property_claim: property_claim.value,
      vehicle_claim: vehicle_claim.value,
     }, deposit });

    // Get updated messages
    const messages = await getLast10Messages();
    setMessages(messages.reverse());

    message.value = '';
    donation.value = '0';
    fieldset.disabled = false;
    message.focus();
  };

  const signIn = () => { wallet.signIn() }

  const signOut = () => { wallet.signOut() }

  return (

  
    <main>
      <table class="button-container">
        <tr>
          <td>
            <img src={logo}></img>
          </td>
          <td>
      {isSignedIn
            ? <button onClick={signOut}>Log out</button>
            : <button onClick={signIn}>Log in</button>
          }
          </td>
        </tr>
      </table>

      
      <hr />
        <body>
        <div class="container">
        <div class="grey-div">
            <h2>Where innovation meets security in auto insurance</h2>
            <p>By integrating blockchain technology, we provide unparalleled security and transparency in our claims process.</p>
        </div>

        <div class="white1-div">
          <img src={icon1}></img>
        </div>
    </div>
        </body>

        <body>
          <div class="container">
            <div class="box">
            <h3> P2P </h3>  
            <p> Connects people and creates a more transparent and community-driven insurance experience. </p>
            </div>
            <div class="box">
            <h3> Machine Learning </h3> 
            <p> Accurately assess risk and detect fraudulent claims in real-time. </p> 
            </div>
            <div class="box">            
            <h3> Blockchain </h3> 
            <p> Ensure secure, immutable records for all transactions and claims, enhancing trust and efficiency. </p> 
            </div>
          </div>
        </body>

        <body>
        <div class="container">
        <div class="white2-div">
        <img src={icon2}></img>
        </div>

        <div class="grey-div">
            <h2>Onboarding</h2>
            <p>Joining our insurance pool is simple and secure. By connecting your wallet via the NEAR API, you can seamlessly enter our pool and start benefiting from our cutting-edge insurance solutions.</p>
        </div>
    </div>
        </body>

        <body>
        <div class="container">
        <div class="white-div">
            <h4>Claim Today!</h4>
            <p>Fill in the form below for your claim evaluation.</p>
        </div>

        <div class="white3-div">
          <img src={icon3}></img>
        </div>
    </div>
        </body>

      {isSignedIn
        ? <Form onSubmit={onSubmit} currentAccountId={wallet.accountId} />
        : <SignIn />
      }


      <body>
        <div class="container">
        <div class="white-div">
        </div>
        </div>
      </body>

    </main>
  )
}

export default App

/*  
{!!messages.length && <Messages messages={messages} />}
was between <hr /> & </main>, line 176
*/