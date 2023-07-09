import React, { useEffect, useState } from 'react';
import { Group } from '@mantine/core';
import { useSet } from '../../hooks/useSets';
import { useParams } from 'react-router-dom';
import { EditModal } from '../../components/modal/EditFlashcard';
import axios, { AxiosResponse } from 'axios';
import { CreateFlashcard, Flashcard } from '../../components/Flashcard';
import { ConfirmationModal } from '../../components/modal/ConfirmationModal';

export type Tag = {
    id: number,
    name: string,
    created: string,
    partner_tag: boolean,
    studyset: number,
    updated: string,
    creator: number,
    flashcards_count: number,
    textbook_exercises_count: number,
    colour: number
}

export type Set = {
    name: string,
    id: number,
    subsets: {
        id: number;
        colorid: number;
        name: string
    }[],
    tags: Tag[],
    flashcards: {
        answer_html: {
            text: string,
            is_correct: boolean
        }[],
        creator_id: number,
        id: number,
        question_html: {
            text: string,
            is_correct: boolean
        }[],
        solution_html: string,
        studysets: number[],
        tags: number[]
    }[]
} 

export const SetPage: React.FC = () => {
    const params = useParams()
    const {data, refreshSet} = useSet(params.setID ?? "")

    const [deleteModal, setDeleteModal] = useState<number|undefined>()
    const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false)

    const [editCard, setEditCard] = useState<{id: number, question: string, answer: string, tags: number[]} | undefined>()
    const [editModalVisible, setEditModalVisible] = useState<boolean>(false)

    useEffect(() => {
        if(deleteModal)
            setDeleteModalVisible(true)
        else if(!deleteModalVisible)
            setDeleteModalVisible(false)
        if(editCard)
            setEditModalVisible(true)
        else if(!editModalVisible)
            setEditModalVisible(false)
    }, [editCard, deleteModal])

    return (
        <>
            {editCard && (
            <EditModal 
                tags={data?.tags || []} 
                id={editCard.id} 
                currentTags={editCard.tags}
                question={editCard.question} 
                answer={editCard.answer} 
                isOpen={editModalVisible}
                onClose={() => {
                    setEditCard(undefined)
                    setEditModalVisible(false)
                }}
                onSubmit={(question: string, answer: string, tags: string[]) => {
                    axios.patch(`/api/sets/${data?.id}/cards`, {
                        id: editCard.id,
                        tags: tags.map(Number),
                        question: question,
                        answer: answer
                    }).then((val: AxiosResponse<any,any>) => {
                        if(val.status === 200 && val.data.success){
                            refreshSet()
                        }
                    })
                }}
            />)}
            <ConfirmationModal 
                isOpen={deleteModalVisible}
                data={deleteModal}
                onClose={() => {
                    setDeleteModal(undefined)
                    setDeleteModalVisible(false)
                }}
                onConfirm={(id: any) => {
                    if(id && Number.parseInt(id)){
                        axios.delete(`/api/sets/${data?.id}/cards`, {
                            data: {
                                id: id as number
                            }
                        }).then((val: AxiosResponse<any,any>) => {
                            if(val.status === 200 && val.data.success){
                                refreshSet()
                            }
                        })
                    }
                }}
            />

            <Group spacing={8}>
                {data && (
                    <CreateFlashcard 
                        sets={data.subsets}
                        setID={data.id}
                        tags={data.tags}
                        refreshSet={refreshSet}
                    />
                )}
                {data && data.flashcards.map((flashcard) => (
                    <Flashcard 
                        setID={data.id}
                        tagData={data.tags}
                        tags={flashcard.tags}
                        id={flashcard.id}
                        question={flashcard.question_html[0].text}
                        answer={flashcard.answer_html[0].text}
                        setEditCard={setEditCard}
                        setDeleteModal={setDeleteModal}
                    />
                ))}
            </Group>
        </>
    )
}
export default SetPage