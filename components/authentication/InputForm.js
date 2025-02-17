import RegisterContainer from "./RegisterContainer";
import ErrorMessage from "../ErrorMessage";

function InputForm(props) {
    return (
        <>
            <RegisterContainer
                placeholder="enter your name"
                text="Name"
                onChangeText={props.setUserName}
                value={props.userName}
            />
            <ErrorMessage error={props.userNameError} />
            <RegisterContainer
                placeholder="youremail@email.com"
                text="Email"
                onChangeText={props.setEmail}
                value={props.email}
            />
            <ErrorMessage error={props.emailError} />
            <RegisterContainer
                placeholder="password"
                text="Password"
                onChangeText={props.setPassword}
                value={props.password}
                secureTextEntry={true}
            />
            <ErrorMessage error={props.passwordError} />
        </>
    );
}

export default InputForm;
