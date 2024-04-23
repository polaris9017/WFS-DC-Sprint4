import oc from "open-color";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useLogin} from "@/hooks/useLogin";
import {LoginProps} from "@/props/UserProps";

const LoginForm = () => {
    const {login} = useLogin();
    const {register, handleSubmit, formState: {errors}} = useForm<LoginProps>();
    const navigate = useNavigate();

    const onSubmit = async (data: LoginProps) => {
        const {result} = await login(data);
        if (result === 'unauthorized') return alert('이메일 또는 비밀번호를 다시 한번 확인해 주십시오.');
        else if (result === 'success') {
            alert('로그인되었습니다.');
            return navigate('/notes');
        }
    };

    return (
        <Container>
            <Header>
                <Link to="/">Programmers Note Editor</Link>
            </Header>
            <Title>로그인</Title>
            <FormStyle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <label htmlFor="email">이메일</label>
                        <input id="email" type="email" inputMode="email" {...register("email", {required: true})} />
                        {errors.email && <p className="error-text">이메일이 입력되지 않았습니다.</p>}
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password">비밀번호</label>
                        <input id="password" type="password"
                               inputMode="text" {...register("password", {required: true})} />
                        {errors.password && <p className="error-text">비밀번호가 입력되지 않았습니다.</p>}
                    </fieldset>
                    <fieldset>
                        <button type="submit">로그인</button>
                    </fieldset>
                    <div className="info">
                        <span>아직 계정이 없으신가요? </span><Link to="/join">가입하기</Link>
                    </div>
                </form>
            </FormStyle>
        </Container>
    );
}

export const Container = styled.div`
    h1 {
        margin: 10vh 0 50px 0;
    }

    a:link {
        text-decoration: none;
        color: transparent;
    }

    a:visited, a:active {
        color: inherit;
    }
`;

export const Header = styled.header`
    font-size: 1.3rem;
    font-weight: bold;
    margin: 30px 0 0 30px;
`;

export const Title = styled.h1`
    font-size: 2.5rem;
    text-align: center;
`;

export const FormStyle = styled.div`
    max-width: 25rem;
    margin: 0 auto;

    fieldset {
        margin: 0 10px;
        border: 0;
        padding: 0 0 10px 0;

        .error-text {
            color: red;
            margin: 0;
            font-size: 0.8rem;
        }
    }

    input {
        width: 100%;
        border-radius: 5px;
        border: 1px solid ${oc.gray[5]};
    }

    button {
        margin: 10px 0 0 0;
        width: 100%;
        border-radius: 5px;
        color: ${oc.blue[6]};
        background-color: ${oc.blue[1]};
        border: 1px solid ${oc.blue[3]};
        cursor: pointer;
    }

    .info {
        text-align: center;
        padding: 16px 0 0 0;

        a {
            color: ${oc.blue[6]};
        }
    }
`;

export const LoginFormStyle = {
    Container,
    Header,
    Title,
    FormStyle
};

export default LoginForm;