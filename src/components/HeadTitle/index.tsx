import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * 修改网页title标签
 *
 * @param titles 网页Title标签内容数组，自动用-符号分隔
 * @author Jia-Yao Zhao
 */
const HeadTitle: FC<{ titles?: (string | null | undefined)[] }> = ({
  titles,
}) => (
  <Helmet>
    <title>
      {titles ? `${titles.filter(Boolean).join('-')}-` : ''}
      海宁技师学院面试管理系统
    </title>
  </Helmet>
);

export default HeadTitle;
