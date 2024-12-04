'use client';
import './AddForm.scss';
import { v4 } from "uuid";
import { useRouter } from 'next/navigation'
import { Menu, MenuContextType } from '@/lib/types';
import { useMenus } from '@/context/MenusContext';
import { useForm } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';

type Props = {
    menu?: Menu,
    parentId?: string,
    menuLevel?: number,
    setAddMenuFormVisibility?: Dispatch<SetStateAction<boolean>>,
    setEditFormMenuVisibility?: Dispatch<SetStateAction<boolean>>,
}

const AddForm = ({ menu, parentId, menuLevel, setAddMenuFormVisibility, setEditFormMenuVisibility }: Props) => {
    const { addMenu, updateMenu } = useMenus() as MenuContextType;
    const { register, formState: { errors }, handleSubmit, getValues, reset } = useForm();
    const Router = useRouter();

    const onAdd = () => {
        if (parentId !== undefined) {
            addMenu({
                name: getValues("name"), url: getValues("url"), id: v4(),
            }, parentId)
        }
        else addMenu({
            name: getValues("name"), url: getValues("url"), id: v4(),
        });
        if (setAddMenuFormVisibility) setAddMenuFormVisibility(false)
        else Router.push('/');
    }

    const onEdit = () => {
        console.log('test: ', menu!.id, getValues("name"), getValues("url"));
        updateMenu(menu!.id, getValues("name"), getValues("url"));
        if (setEditFormMenuVisibility) setEditFormMenuVisibility(false)
        else Router.push('/');
    }

    return (
        <>
            <form className={`add--form -level${menuLevel}`} onSubmit={menu ? handleSubmit(onEdit) : handleSubmit(onAdd)}>
                <button onClick={() => { reset({ name: '', url: '' }); console.log('reset') }} className='bin'></button>
                <div className="field">
                    <label htmlFor="name" className="label" >Nazwa</label>
                    <input
                        defaultValue={menu && menu.name ? menu.name : ''}
                        className='input'
                        id="name"
                        type="text"
                        placeholder="np. Promocje"
                        {...register("name", { required: true })}
                    />
                    {errors.name && <p className='error' role="alert">Nazwa jest wymagana</p>}
                </div>
                <div className="field">
                    <label htmlFor="url" className="label" >Link</label>
                    <input
                        defaultValue={menu && menu.url ? menu.url : `https://www.google.pl`}
                        className='input -url'
                        id="url" type="text"
                        placeholder="Wklej lub wyszukaj"
                        {...register("url", {
                            required: true,
                            pattern: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i
                        })
                        } />
                    {errors.url && <p className='error' role="alert">Poprawny link jest wymagany</p>}
                </div>
                <div className="buttons">
                    {
                        setAddMenuFormVisibility ? <button className="button -rounded" onClick={() => setAddMenuFormVisibility(false)}>Anuluj</button>
                            :
                            <button className="button -rounded" onClick={() => setEditFormMenuVisibility ? setEditFormMenuVisibility(false) : null}>Anuluj</button>
                    }
                    <button type="submit" className="button -rounded -colored">{menu ? 'Edytuj' : 'Dodaj'}</button>
                </div>
            </form>
        </>
    );
}

export default AddForm;
