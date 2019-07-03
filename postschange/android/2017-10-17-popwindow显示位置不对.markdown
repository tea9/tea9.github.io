---
layout:     post
title:      "popwindow显示位置不对"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/post-bg-android.jpg"
tags:
    - "android"
---
private void showAllPopWindow() {
        cityId = "0";
        final View popupView = mInflater.inflate(R.layout.activity_recruit_all, null);
        View other_view= popupView.findViewById(R.id.other_view);
        RecyclerView recyclerView = (RecyclerView) popupView.findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        final RecyclerView.Adapter adapter = new CommonAdapter<RecruitCityEntity>(this, R.layout.activity_recruit_all_item, mCityData) {
            @Override
            protected void convert(ViewHolder holder, RecruitCityEntity entity, final int position) {
                holder.setText(R.id.text, entity.getCityName());
                if (mCityData.get(position).isCheck()) {
                    holder.setTextColor(R.id.text, ContextCompat.getColor(RecruitActivity.this, R.color.theme_gold));
                } else {
                    holder.setTextColor(R.id.text, ContextCompat.getColor(RecruitActivity.this, R.color.black));
                }
                holder.setOnClickListener(R.id.text, new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        cityId = mCityData.get(position).getId();
                        for (int i=0;i<mCityData.size();i++)
                            mCityData.get(i).setCheck(false);
                        mCityData.get(position).setCheck(true);
                        notifyDataSetChanged();
                        if (window!=null)
                            window.dismiss();
                        mRefreshLayout.beginRefreshing();
                    }
                });
            }
        };
        recyclerView.setAdapter(adapter);

        other_view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (window!=null)
                    window.dismiss();
            }
        });
        window = new CustomPopWindow(popupView, LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT);
        window.setOutsideTouchable(true);
        window.setBackgroundDrawable(new ColorDrawable(Color.parseColor("#55000000")));
        window.setFocusable(true);
        window.update();
        window.showAsDropDown(all_tv);

        all_tv.setTextColor(getResources().getColor(R.color.theme_gold));
        all_tv.setCompoundDrawablesWithIntrinsicBounds(null, null, getResources().getDrawable(R.mipmap.city_screen_sel), null);


        window.setOnDismissListener(new PopupWindow.OnDismissListener() {
            @Override
            public void onDismiss() {
                all_tv.setTextColor(getResources().getColor(R.color.black));
                all_tv.setCompoundDrawablesWithIntrinsicBounds(null, null, getResources().getDrawable(R.mipmap.city_screen_no), null);
            }
        });
    }




public class CustomPopWindow extends PopupWindow {
    public CustomPopWindow(View contentView, int width, int height) {
        super(contentView,width,height);
    }

    /**
     *  在android7.0上，如果不主动约束PopuWindow的大小，比如，设置布局大小为 MATCH_PARENT,那么PopuWindow会变得尽可能大，以至于 view下方无空间完全显示PopuWindow，而且view又无法向上滚动，此时PopuWindow会主动上移位置，直到可以显示完全。
     *　解决办法：主动约束PopuWindow的内容大小，重写showAsDropDown方法：
     * @param anchor
     */
    @Override
    public void showAsDropDown(View anchor) {
        if(Build.VERSION.SDK_INT >= 24){
            Rect visibleFrame = new Rect();
            anchor.getGlobalVisibleRect(visibleFrame);
            int height = anchor.getResources().getDisplayMetrics().heightPixels - visibleFrame.bottom;
            setHeight(height);
        }
        super.showAsDropDown(anchor);

    }

}
