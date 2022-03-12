import React, { forwardRef, useImperativeHandle } from "react";
import { useSelector } from "react-redux";
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'react-quill/dist/quill.snow.css';

const CustomEditor = forwardRef((props, ref) => {
    const GalaxiesState = useSelector(state => state.galaxies);
    const { quill, quillRef, Quill } = useQuill({
        modules: { blotFormatter: {} }
    });

    if (Quill && !quill) {
        Quill.register('modules/blotFormatter', BlotFormatter);
    }

    if (quill) {
        try {
            quill.enable(false);
            const tbar = document.getElementsByClassName('ql-toolbar')[0];
            if (tbar) {
                tbar.style.visibility = "hidden";
                tbar.style.height = '0px';
            }

            if (props.fileId && props.fileId != '') {
                const glx = GalaxiesState.galaxies.filter(g => g.id == props.galaxyId)[0];
                const wikiFile = glx.files.filter(f => f.filename == props.fileId)[0];

                if (wikiFile && wikiFile.content) {
                    quill.clipboard.dangerouslyPasteHTML(wikiFile.content);
                }
            }
        }
        catch (e) { console.error(e) }
    }

    useImperativeHandle(ref, () => ({
        getContent() {
            return quill.root.innerHTML;
        },
        setContent(content) {
            quill.clipboard.dangerouslyPasteHTML(content);
        },
        disable() {
            quill.enable(false);
            const tbar = document.getElementsByClassName('ql-toolbar')[0];
            if (tbar) {
                tbar.style.visibility = "hidden";
                tbar.style.height = '0px';
            }
        },
        enable() {
            quill.enable(true);
            const tbar = document.getElementsByClassName('ql-toolbar')[0];
            if (tbar) {
                tbar.style.visibility = "visible";
                tbar.style.height = 'auto';
            }
        },

    }));

    return (
        <div style={{ ...props.style }}>
            <div ref={quillRef} />
        </div>
    );
})

export default CustomEditor;






