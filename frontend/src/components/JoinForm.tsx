import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useJoin} from "@/hooks/useJoin";
import {LoginProps as JoinProps} from "@/props/UserProps";
import {Container, FormStyle, Header, Title} from "@/components/LoginForm";

const JoinForm = () => {
    const {join} = useJoin();
    const {register, handleSubmit, formState: {errors}} = useForm<JoinProps>();
    const navigate = useNavigate();

    const onSubmit = async (data: JoinProps) => {
        const {result, message} = await join(data);
        if (result === 'unauthorized') return alert(message);
        else if (result === 'success') {
            alert('가입 완료되었습니다.');
            return navigate('/login');
        }
    };

    return (
        <Container>
            <Header>
                <Link to="/">Programmers Note Editor</Link>
            </Header>
            <Title>회원 가입</Title>
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
                        <button type="submit">가입</button>
                    </fieldset>
                    <div className="info">
                        <span>계정이 이미 있으세요? </span><Link to="/login">로그인</Link>
                    </div>
                </form>
            </FormStyle>
        </Container>
    );
};

export default JoinForm;
