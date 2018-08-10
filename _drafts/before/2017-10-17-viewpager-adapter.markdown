---
layout:     post
title:      "viewpager-adapter"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/post-bg-android.jpg"
tags:
    - "android"
---

	class MyPageAdapter extends PagerAdapter implements BGARefreshLayout.BGARefreshLayoutDelegate {

			private List<String> list;

			public MyPageAdapter(List<String> list) {
				this.list = list;
			}

			@Override
			public int getCount() {
				return list.size();
			}

			@Override
			public boolean isViewFromObject(View view, Object object) {
				return view == object;
			}

			@Override
			public Object instantiateItem(ViewGroup container, int position) {

				List<FirstAndSecondLevelClassifyEntity.son> list = (List<FirstAndSecondLevelClassifyEntity.son>) getIntent().getSerializableExtra("classify_secondLevelList");
				secondCateId = list.get(position).getId();

				View view = LayoutInflater.from(context).inflate(R.layout.shopping_classify_fragment, null);
				view.setId(new Random().nextInt(1000));
				mrefreshLayout = (BGARefreshLayout) view.findViewById(R.id.m_refreshLayout);
				data_recycleview = (RecyclerView) view.findViewById(R.id.data_recycleview);
				mrefreshLayout.setDelegate(this);
				mrefreshLayout.setRefreshViewHolder(new BGANormalRefreshViewHolder(context, true));
				data_recycleview.setLayoutManager(new StaggeredGridLayoutManager(2, StaggeredGridLayoutManager.VERTICAL));

	//            mrefreshLayout.beginRefreshing();
	//            addGoodsData();
				shoppingClassifyGridAdapter = new ShoppingClassifyGridAdapter(context, goodlist);
				data_recycleview.setAdapter(shoppingClassifyGridAdapter);
				data_recycleview.setOnTouchListener(
						new View.OnTouchListener() {
							@Override
							public boolean onTouch(View v, MotionEvent event) {
								if (mrefreshLayout.isLoadingMore()) {
									return true;
								} else {
									return false;
								}
							}
						}
				);
				container.addView(view);
				return view;
			}

			@Override
			public void destroyItem(ViewGroup container, int position, Object object) {
	//            super.destroyItem(container, position, object);
				container.removeView((View) object);
			}

			@Override
			public int getItemPosition(Object object) {
				return POSITION_NONE;
			}


			@Override
			public void onBGARefreshLayoutBeginRefreshing(final BGARefreshLayout refreshLayout) {

				page = 1;
				goodlist.clear();
				addGoodsData();

				refreshLayout.endRefreshing();

			}

			@Override
			public boolean onBGARefreshLayoutBeginLoadingMore(final BGARefreshLayout refreshLayout) {
				// 如果网络可用，则异步加载网络数据，并返回true，显示正在加载更多
				new AsyncTask<Void, Void, Void>() {

					@Override
					protected Void doInBackground(Void... params) {
	//                try {
	////                    Thread.sleep(250);
	//                } catch (InterruptedException e) {
	//                    e.printStackTrace();
	//                }
						return null;
					}

					@Override
					protected void onPostExecute(Void aVoid) {
						// 加载完毕后在UI线程结束加载更多
						page++;
						if (page > 3) {
							refreshLayout.endLoadingMore();
							ToastUtils.show(context, "没有最新数据了");

						} else {
							ShoppingClassifyGridEntity entity = new ShoppingClassifyGridEntity();
							entity.setGoods_name("时尚T恤时尚时尚最时尚灰常时髦");
							entity.setGoods_sell("6");
							entity.setGoods_price("87.00");
							for (int i = 0; i < 2; i++) {
								goodlist.add(entity);
							}
							shoppingClassifyGridAdapter.notifyDataSetChanged();
							refreshLayout.endLoadingMore();
						}
					}
				}.execute();
				return true;
			}

		}
