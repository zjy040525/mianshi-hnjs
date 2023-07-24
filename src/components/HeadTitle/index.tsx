import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * 修改网页标题
 *
 * @param titles 标题数组，自动用`-`符号分隔
 * @author Jia-Yao Zhao
 */
export const HeadTitle: FC<{ titles?: (string | null | undefined)[] }> = ({
  titles,
}) => (
  <Helmet>
    <title>
      {titles ? `${titles.filter(Boolean).join('-')}-` : ''}
      海宁技师学院面试管理系统
    </title>
  </Helmet>
);
