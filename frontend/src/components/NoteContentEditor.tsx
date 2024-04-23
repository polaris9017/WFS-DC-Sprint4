import oc from "open-color";
import {styled} from "styled-components";
import {useEffect, useRef} from 'react';
import {StarterKit} from "@tiptap/starter-kit";
import {EditorContent, useEditor} from "@tiptap/react";
import {Placeholder} from "@tiptap/extension-placeholder";

interface NoteContentEditorProps {
    content: string;

    onChangeContent(content: string): void;
}

const NoteContentEditor = ({content, onChangeContent}: NoteContentEditorProps) => {
    const extensions = [StarterKit, Placeholder.configure({
        placeholder: '내용을 입력하세요'
    })];

    const lastChangedHTML = useRef('');

    const editor = useEditor({
        extensions,
        content,
        onUpdate: ({editor}) => {
            lastChangedHTML.current = editor.getHTML();
            onChangeContent(editor.getHTML());
        }
    });

    useEffect(() => {
        if (lastChangedHTML.current == content || !editor) return;

        let {from, to} = editor.state.selection;
        editor.commands.setTextSelection({from, to});

        editor.commands.setContent(content);
        lastChangedHTML.current = content;
    }, [editor, content]);

    return (
        <>
            {editor && <EditorContent editor={editor}/>}
        </>
    );
};

const NoteContentEditorStyle = styled(EditorContent)`
    flex: 1;

    .tiptap {
        outline: none;
        cursor: auto;

        height: 100%;

        p.is-editor-empty:first-child::before {
            color: ${oc.gray[5]};
            content: attr(data-placeholder);
            float: left;
            height: 0;
            pointer-events: none;
        }

        > * + * {
            margin-top: 0.75em;
        }

        ul, ol {
            padding: 0 1rem;
        }

        h1, h2, h3, h4, h5, h6 {
            line-height: 1.1;
        }

        code {
            background-color: ${oc.gray[2]};
            border-radius: 0.2rem;
            font-size: 0.8rem;
            padding: 3px;
        }

        pre {
            background: #0D0D0D;
            color: #FFF;
            font-family: "JetBrainsMono", monospace;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;

            code {
                color: inherit;
                padding: 0;
                background: none;
                font-size: 0.8rem;
            }
        }

        img {
            max-width: 100%;
            height: auto;
        }

        blockquote {
            padding-left: 1rem;
            border-left: 2px solid ${oc.gray[5]};
        }

        hr {
            border: none;
            border-top: 2px solid ${oc.gray[3]};
            margin: 2rem 0;
        }
    }
`;

export default NoteContentEditor;