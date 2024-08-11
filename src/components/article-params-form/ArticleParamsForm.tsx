import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';

import styles from './ArticleParamsForm.module.scss';

import clsx from 'clsx';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { useState, useRef, SyntheticEvent } from 'react';

import {ArticleStateType, OptionType, defaultArticleState, fontSizeOptions,
	 contentWidthArr, backgroundColors, fontColors,
	  fontFamilyOptions, fontFamilyClasses} from '../../constants/articleProps'

import {useOutsideClickClose} from '../select/hooks/useOutsideClickClose'

// чтобы был pull request
type ArticleParamsFormProps = {
	articleState: ArticleStateType,
	setArticleState: (params: ArticleStateType) => void
}

export const ArticleParamsForm = ({articleState, setArticleState}: ArticleParamsFormProps) => {
	const rootRef = useRef<HTMLDivElement>(null);
	// для хранения состояний
	const [isOpenState, setIsOpenState] = useState<boolean>(false);
	const [fontColorState, setFontColorState] = useState<OptionType>(articleState.fontColor);
	const [fontFamilyState, setFontFamilyState] = useState<OptionType>(articleState.fontFamilyOption);
	const [contentWidthState, setContentWidthState] = useState<OptionType>(articleState.contentWidth);
	const [fontSizeOptionState, setFontSizeOptionState] = useState<OptionType>(articleState.fontSizeOption);
	const [backgroundColorState, setBackgroundColorState] = useState<OptionType>(articleState.backgroundColor);

	// навешали на клик вне формы
	useOutsideClickClose({
		isOpenState,
		rootRef,
		onClose: () => setIsOpenState(!isOpenState),
		onChange: setIsOpenState
	});

	// хендлер для отправки формы
	const handleSubmitForm = (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState({
			...articleState,
			fontFamilyOption: fontFamilyState,
			fontColor: fontColorState,
			backgroundColor: backgroundColorState,
			contentWidth: contentWidthState,
			fontSizeOption: fontSizeOptionState,
		})
		setIsOpenState(false);
	}
	// хендлер для обновления формы
	const handleResetForm = () => {
		setArticleState(defaultArticleState);
		console.log("reset")
		setIsOpenState(false);
		setFontColorState(defaultArticleState.fontColor);
		setFontFamilyState(defaultArticleState.fontFamilyOption);
		setContentWidthState(defaultArticleState.contentWidth);
		setFontSizeOptionState(defaultArticleState.fontSizeOption);
		setBackgroundColorState(defaultArticleState.backgroundColor);
	}

	// возвращаем разметку формы со всеми ее полями
	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpenState} onClick={() => setIsOpenState(!isOpenState)}/>
			<aside className={clsx(styles.container, isOpenState && styles.container_open)}>
				<form className={styles.form} onSubmit={handleSubmitForm}>
					<Text children='Задайте параметры' as='h1' size={31} weight={800} uppercase={true} dynamicLite={true}/>
					<Select selected={fontFamilyState} options={fontFamilyOptions}
					onChange={setFontFamilyState} placeholder={fontFamilyState.value} title='Шрифт'/>
					<RadioGroup name={fontSizeOptionState.value} options={fontSizeOptions} 
					selected={fontSizeOptionState} onChange={setFontSizeOptionState} title='Размер шрифта'/>
					<Select selected={fontColorState} options={fontColors}
					onChange={setFontColorState} placeholder={fontColorState.value} title='Цвет шрифта'/>
					<Select selected={backgroundColorState} options={backgroundColors}
					onChange={setBackgroundColorState} placeholder={backgroundColorState.value} title='Цвет фона'/>
					<Select selected={contentWidthState} options={contentWidthArr}
					onChange={setContentWidthState} placeholder={contentWidthState.value} title='Ширина контента'/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleResetForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
