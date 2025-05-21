import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';
import { clsx } from 'clsx';
import React, { useState, useRef } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	active: boolean;
	setActive: (active: boolean) => void;
	onApllyParams: (params: ArticleParamsFormState) => void;
};

type ArticleParamsFormState = {
	fontFamilyOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
	fontSizeOption: OptionType;
};

export const ArticleParamsForm = ({
	active,
	setActive,
	onApllyParams,
}: ArticleParamsFormProps) => {
	const [articleParamsFormState, setArticleParamsFormState] =
		useState(defaultArticleState);

	const asideRef = useRef<HTMLDivElement>(null);

	const handleFontFamilyOption = (selectedOption: OptionType) => {
		setArticleParamsFormState((prevState) => ({
			...prevState,
			fontFamilyOption: selectedOption,
		}));
	};

	const handleFontSizeOptions = (selectedOption: OptionType) => {
		setArticleParamsFormState((prevState) => ({
			...prevState,
			fontSizeOption: selectedOption,
		}));
	};

	const handleFontColors = (selectedOption: OptionType) => {
		setArticleParamsFormState((prevState) => ({
			...prevState,
			fontColor: selectedOption,
		}));
	};

	const handleBackgroundColors = (selectedOption: OptionType) => {
		setArticleParamsFormState((prevState) => ({
			...prevState,
			backgroundColor: selectedOption,
		}));
	};

	const handleContentWidth = (selectedOption: OptionType) => {
		setArticleParamsFormState((prevState) => ({
			...prevState,
			contentWidth: selectedOption,
		}));
	};

	const handleReset = () => {
		setArticleParamsFormState(defaultArticleState);
		onApllyParams(defaultArticleState);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApllyParams(articleParamsFormState);
		setActive(false);
	};

	useOutsideClickClose({
		isOpen: active,
		rootRef: asideRef,
		onChange: setActive,
	});

	return (
		<>
			<ArrowButton
				isOpen={active}
				onClick={() => {
					setActive(!active);
				}}
			/>
			<aside
				ref={asideRef}
				className={clsx(styles.container, { [styles.containerOpen]: active })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onClick={(e) => e.stopPropagation()}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						title='шрифт'
						selected={articleParamsFormState.fontFamilyOption}
						onChange={handleFontFamilyOption}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={articleParamsFormState.fontSizeOption}
						onChange={handleFontSizeOptions}
						title='рАЗМЕР шрифта'
					/>
					<Select
						options={fontColors}
						title='Цвет шрифта'
						selected={articleParamsFormState.fontColor}
						onChange={handleFontColors}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						title='Цвет фона'
						selected={articleParamsFormState.backgroundColor}
						onChange={handleBackgroundColors}
					/>
					<Select
						options={contentWidthArr}
						title='Ширина контента'
						selected={articleParamsFormState.contentWidth}
						onChange={handleContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
