import NavBarLogin from "../components/NavBarLogin";
import RegisterInput from "../components/RegisterInput";

//Registreringsside for ny bruker. Brukere blir lagret i databasen.


function LogInPage() {
  return (
    <div>
      <NavBarLogin></NavBarLogin>
      <div
        className="mt-20 mx-auto max-w-4xl bg-custom-green rounded-3xl  sm:py-8 sm:px-6 sm:items-center sm:space-y-0 sm:space-x-6"
        style={{ height: "60vh", width: "40vw", minWidth: "300px" }}
      >
        <h1 className="text-black text-3xl font-bold text-center">Register</h1>
        <RegisterInput></RegisterInput>
      </div>
    </div>
  );
}
export default LogInPage;
