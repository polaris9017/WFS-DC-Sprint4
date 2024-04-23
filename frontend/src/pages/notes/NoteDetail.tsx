import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import oc from 'open-color';
import {styled} from "styled-components";
import {FaRegFloppyDisk, FaRegTrashCan} from "react-icons/fa6";
import withCurrentNote, {CurrentNoteProps} from "@/components/hocs/withCurrentNote";
import {useUpdateNote} from "@/hooks/useUpdateNote";
import {useDeleteNote} from "@/hooks/useDeleteNote";
import {NoteProps} from "@/props/NoteProps";
import NoteTitleInput from "@/components/NoteTitleInput";
import NoteContentEditor from "@/components/NoteContentEditor";

const NoteDetail = ({currentNote}: CurrentNoteProps) => {
    const navigate = useNavigate();

    const id = currentNote.id;
    const [title, setTitle] = useState(currentNote.title);
    const [content, setContent] = useState(currentNote.content);

    const {updateNote} = useUpdateNote();
    const {deleteNote} = useDeleteNote();

    const onUpdate = async () => {
        await updateNote({id, title, content});
        alert('저장되었습니다.');
    }

    const onDelete = async () => {
        await deleteNote(id);
        navigate('/notes');
    }

    useEffect(() => {
        setTitle(currentNote.title);
        setContent(currentNote.content);
    }, [currentNote]);

    return (
        <DetailStyle>
            <Header>
                <div className="title">
                    <NoteTitleInput title={title} onChangeTitle={setTitle}/>
                </div>
                <div className='menu-buttons'>
                    <DetailButton onClick={onUpdate}>
                        <FaRegFloppyDisk/>
                        <p>저장</p>
                    </DetailButton>
                    <DetailButton onClick={onDelete}>
                        <FaRegTrashCan/>
                        <p>삭제</p>
                    </DetailButton>
                </div>
            </Header>
            <NoteContentEditor content={content} onChangeContent={setContent}/>
        </DetailStyle>
    );
};

const DetailStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;
`;

const Header = styled.header`
    display: flex;
    gap: 30px;

    .title {
        flex: 1;
    }

    .menu-buttons {
        flex-shrink: 0;
        display: flex;
        gap: 10px;
    }
`;

const DetailButton = styled.button`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: bold;
    color: ${oc.gray[7]};
    border: 1px solid ${oc.gray[3]};
    border-radius: 5px;
    padding: 5px 10px;
    width: fit-content;
    height: fit-content;
    cursor: pointer;
`;

export default withCurrentNote(NoteDetail);