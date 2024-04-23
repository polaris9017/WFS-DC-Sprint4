import oc from "open-color";
import styled from "styled-components";
import {FiLogOut} from "react-icons/fi";
import {FaRegSquarePlus, FaUser} from 'react-icons/fa6';
import NoteList from "@/components/NoteList";
import {useLogout} from "@/hooks/useLogout";
import {useCreateNote} from "@/hooks/useCreateNote";
import {Outlet, useNavigate} from "react-router-dom";
import {useNotes} from "@/hooks/useNotes";


interface NoteIndexProps {
    currentUser: string;
}

const NoteIndexTemplate = (props: NoteIndexProps) => {
    const navigate = useNavigate();

    const {logout} = useLogout();
    const {createNote} = useCreateNote();
    const fetchNotes = useNotes();

    const onCreate = async () => {
        const {id} = await createNote({title: "", content: ""});
        navigate(`/notes/${id}`);
    }

    return (
        <NoteIndexTemplateStyle>
            <div className='sidebar'>
                <div className='user'>
                    <FaUser/>
                    <p>{props.currentUser}</p>
                </div>
                <SideBarButton onClick={() => logout()}>
                    <FiLogOut/>
                    <p>로그아웃</p>
                </SideBarButton>
                <SideBarButton onClick={onCreate}>
                    <FaRegSquarePlus/>
                    <p>노트 생성</p>
                </SideBarButton>
                <NoteList notes={fetchNotes.notes}/>
            </div>
            <div className='editor'>
                <Outlet/>
            </div>
        </NoteIndexTemplateStyle>
    );
};

const NoteIndexTemplateStyle = styled.div`
    display: flex;
    height: 100vh;

    p {
        margin: 0;
    }

    a:link {
        text-decoration: none;
        color: transparent;
    }

    a:visited, a:active {
        color: inherit;
    }

    .sidebar {
        display: flex;
        flex-direction: column;
        width: 300px;
        background-color: ${oc.gray[0]};
        padding: 5px;

        .user {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 5px;
            font-weight: bold;
            margin: 15px 0;
        }
    }

    .editor {
        flex: 1;
        padding: 20px;
        width: 100%;
    }
`;

const SideBarButton = styled.button`
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: bold;
    color: ${oc.gray[6]};
    border: none;
    padding: 0 5px;
    cursor: pointer;
`;

export default NoteIndexTemplate;