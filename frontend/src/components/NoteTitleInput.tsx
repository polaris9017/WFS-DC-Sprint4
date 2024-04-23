import oc from 'open-color';
import styled from 'styled-components';

interface NoteTitleInputProps {
    title: string;
    onChangeTitle: (title: string) => void;
}

const NoteTitleInput = ({title, onChangeTitle}: NoteTitleInputProps) => {
    return (
        <NoteTitleInputStyle
            contentEditable
            placeholder={title}
            onBlur={event => onChangeTitle(event.target.textContent || '')}
            onKeyDown={event => {
                event.key === 'Enter' && event.preventDefault()
            }}
        />
    );
};

interface NoteTitleInputStyleProps {
    placeholder: string;
}

const NoteTitleInputStyle = styled.h1<NoteTitleInputStyleProps>`
    width: 100%;
    border: none;
    padding: 0;
    outline: none;
    margin: 0;

    &:empty:before {
        content: attr(placeholder);
        color: ${oc.gray[6]};
    }
`;


export default NoteTitleInput;