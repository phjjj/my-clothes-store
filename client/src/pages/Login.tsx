import Button from "../components/common/Button"
import InputText from "../components/common/inputText"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { SignupStyle } from "./Signup"
import { useAuth } from "../hooks/useAuth"

export interface LoginProps {
  email: string
  password: string
}

function Login() {
  const { userLogin } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>()

  const onSubmit = (data: LoginProps) => {
    userLogin(data)
  }

  return (
    <>
      <SignupStyle>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <label>Email</label>
            <div className="input">
              <InputText
                {...register("email", { required: true })}
                inputType="email"
                placeholder="이메일"
                inputMode="email"
              />
            </div>
            {errors.email && <p className="error-text">이메일을 입력해주세요.</p>}
          </fieldset>

          <fieldset>
            <label>Password</label>
            <div className="input">
              <InputText
                {...register("password", { required: true })}
                inputType="password"
                placeholder="비밀번호"
                inputMode="text"
                autoComplete="off"
              />
            </div>
            {errors.email && <p className="error-text">비밀번호를 입력해주세요.</p>}
          </fieldset>

          <fieldset>
            <Button schema="primary" size="medium">
              Login
            </Button>
          </fieldset>
        </form>

        <div className="signup">
          <Link to="/signup">회원가입</Link>
        </div>
      </SignupStyle>
    </>
  )
}

export default Login
