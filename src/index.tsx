import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [appliedArticleParams, setAppliedArticleParams] =
		useState(defaultArticleState);
	const [sidebarActive, setSidebarActive] = useState(false);

	const handleApplyArticleParams = (params: typeof defaultArticleState) => {
		setAppliedArticleParams(params);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedArticleParams.fontFamilyOption.value,
					'--font-size': appliedArticleParams.fontSizeOption.value,
					'--font-color': appliedArticleParams.fontColor.value,
					'--container-width': appliedArticleParams.contentWidth.value,
					'--bg-color': appliedArticleParams.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				active={sidebarActive}
				setActive={setSidebarActive}
				onApllyParams={handleApplyArticleParams}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
