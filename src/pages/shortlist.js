// import styles from './ShortListAnalytics.less';
import { List } from 'antd';
import { router } from 'umi';
import ShortListCandidateCard from '@/components/ShortListCandidateCard';
import { fetchShortlist } from '@/services/api';
import styles from '@/global.less';

import qs from 'qs';

import React, { Component } from 'react';

const viewCandidate = (id, i) => router.push(`candidate?shortlist=${id}&num=${i}`);

export default class Shortlist extends Component {
  state = { shortListData: null };

  componentDidMount() {
    const { location } = this.props;
    const id = qs.parse(location.search)['?shortlist'];
    console.log(id);
    fetchShortlist(id).then(r => this.setState({ shortListData: r[0], id }));
  }

  render() {
    const { shortListData, id } = this.state;
    if (!shortListData) return null;

    return (
      <div className={styles.cardList}>
        <List
          rowKey="id"
          style={{ marginTop: 24 }}
          grid={{ gutter: 24, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }}
          //   loading={loading}
          dataSource={shortListData.interviews}
          renderItem={(item, index) => (
            <List.Item onClick={() => viewCandidate(id, index)} key={item.id}>
              <ShortListCandidateCard item={item} />
            </List.Item>
          )}
        />
      </div>
    );
  }
}