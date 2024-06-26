import InputText from "../components/common/inputText"
import { useForm } from "react-hook-form"
import Button from "../components/common/Button"
import FindAddress from "../components/common/FindAdress"
import styled from "styled-components"
import { useAuth } from "../hooks/useAuth"

export interface SignupProps {
  name: string
  email: string
  password: string
  confirmPassword: string
  address: string
  phone1: string
  phone2: string
  phone3: string
  addressDetail: string
}

export interface FormattedSignupProps {
  name: string
  email: string
  password: string
  phone: string
  address: string
}

function Signup() {
  const { userSignUp } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignupProps>()

  const password = watch("password")
  const confirmPassword = watch("confirmPassword")

  const onSubmit = (data: SignupProps) => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.")
      return
    }

    // 전화번호와 주소를 하나의 문자열로 합침
    const phone = `${data.phone1}-${data.phone2}-${data.phone3}`
    const address = `${data.address} ${data.addressDetail}`

    // 서버로 전송할 데이터
    const formattedData: FormattedSignupProps = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone,
      address,
    }
    userSignUp(formattedData)
  }

  // 숫자만 입력 가능하도록 설정
  const handleChangeOnlyNums = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, "")
    e.target.value = onlyNums
  }

  return (
    <SignupStyle>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label>name</label>
          <div className="input">
            <InputText
              {...register("name", { required: true })}
              inputType="text"
              placeholder="이름"
              inputMode="text"
            />
          </div>
          {errors.name && <p className="error-text">이름을 입력해주세요.</p>}
        </fieldset>

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
          {errors.password && <p className="error-text">비밀번호를 입력해주세요.</p>}
        </fieldset>

        <fieldset>
          <label>Confirm Password</label>
          <div className="input">
            <InputText
              {...register("confirmPassword", { required: true })}
              inputType="password"
              placeholder="비밀번호 확인"
              inputMode="text"
              autoComplete="off"
            />
          </div>
          {errors.confirmPassword && <p className="error-text">비밀번호를 다시 입력해주세요.</p>}
          {password !== confirmPassword && (
            <p className="error-text">비밀번호가 일치하지 않습니다.</p>
          )}
        </fieldset>

        <fieldset>
          <label>Address</label>
          <div className="input">
            <InputText
              {...register("address", { required: true })}
              inputType="text"
              placeholder="주소"
              inputMode="text"
              disabled={true}
            />
          </div>
          {errors.address && <p className="error-text">주소를 입력해주세요.</p>}
          <div className="find-adress">
            <FindAddress onCompleted={(address) => setValue("address", address)} />
          </div>
        </fieldset>

        <fieldset>
          <label>Address-Detail</label>
          <div className="input">
            <InputText
              {...register("addressDetail", { required: true })}
              inputType="text"
              placeholder="상세 주소"
              inputMode="text"
            />
          </div>
          {errors.address && <p className="error-text">주소를 입력해주세요.</p>}
        </fieldset>

        <fieldset>
          <label>Phone</label>
          <div className="input tel-input">
            <InputText
              {...register("phone1", {
                required: true,
                maxLength: 3,
                pattern: /^[0-9]+$/,
              })}
              maxLength={3}
              inputType="text"
              inputMode="tel"
              onChange={handleChangeOnlyNums}
            />
            -
            <InputText
              {...register("phone2", {
                required: true,
                maxLength: 4,
                pattern: /^[0-9]+$/,
              })}
              maxLength={4}
              inputType="text"
              inputMode="tel"
              onChange={handleChangeOnlyNums}
            />
            -
            <InputText
              {...register("phone3", {
                required: true,
                maxLength: 4,
                pattern: /^[0-9]+$/,
              })}
              maxLength={4}
              inputType="text"
              inputMode="tel"
              onChange={handleChangeOnlyNums}
            />
          </div>
        </fieldset>

        <fieldset>
          <Button schema="primary" size="medium">
            Sign up
          </Button>
        </fieldset>
      </form>
    </SignupStyle>
  )
}

export const SignupStyle = styled.div`
  max-width: ${({ theme }) => theme.layout.medium.width};
  margin: 80px auto;
  border-radius: 10px;
  padding: 40px 20px;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

  h1 {
    color: ${({ theme }) => theme.colors.primary};
    margin: 0 0 20px 0;
  }

  fieldset {
    border: none;
    padding: 0 0 20px 0;

    label {
      display: block;
      margin-bottom: 5px;
      color: ${({ theme }) => theme.colors.primary};
    }

    .find-adress {
      margin-top: 10px;
    }

    .tel-input {
      display: flex;
      gap: 10px;
      align-items: center;
    }
  }
  .error-text {
    color: red;
    margin: 0;
  }

  input {
    width: 100%;
  }

  button {
    width: 100%;
  }

  .signup {
    text-align: center;

    &:hover {
      text-decoration: underline;
    }

    a {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`

export default Signup
