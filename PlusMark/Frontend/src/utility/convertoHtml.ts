import DOMPurify from 'dompurify';
import { DraftEntityMutability, DraftEntityType } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

type DraftEntity = {
    type: DraftEntityType;
    mutability: DraftEntityMutability;
    data: any;
};

export default function convertToHtml(content: string) {
    const customEntityTransform = (entity: DraftEntity, text: string) => {
        if (entity.type == 'IMAGE') {
            const data = entity.data
            const alignment = data.alignment
            switch (alignment) {
                case 'right':
                    return (
                        `<div style='display: flex; justify-content: right'>
                            <img src="${data.src}" height=${data.height} width=${data.width} />
                        </div>`
                    )
                case 'left':
                    return (
                        `<div style='display: flex';>
                            <img src="${data.src}" height=${data.height} width=${data.width} />
                        </div>`
                    )
                default:
                    return (
                        `<div style='display: flex; justify-content: center'>
                            <img src="${data.src}" height=${data.height} width=${data.width} />
                        </div>`
                    )
            }
        }
    }

    try {
        const obj = JSON.parse(content)
        const markup = draftToHtml(
            obj,
            {},
            false,
            customEntityTransform
        );
        return DOMPurify.sanitize(markup)
    } catch (error) {

    }
    return ""

}