---
layout: post
title: "fragment懒加载"
date: 2018-08-10
category: android
tags: android
---

## Fragment懒加载
用于viewpager+fragment布局  

	import android.os.Bundle;
	import android.view.LayoutInflater;
	import android.view.View;
	import android.view.ViewGroup;
	import android.view.ViewGroup.LayoutParams;
	import android.widget.FrameLayout;

	/**
	 * <h1>懒加载Fragment</h1> 只有创建并显示的时候才会调用onCreateViewLazy方法<br>
	 * <br>
	 * <p>
	 * 懒加载的原理onCreateView的时候Fragment有可能没有显示出来。<br>
	 * 但是调用到setUserVisibleHint(boolean isVisibleToUser),isVisibleToUser =
	 * true的时候就说明有显示出来<br>
	 * 但是要考虑onCreateView和setUserVisibleHint的先后问题所以才有了下面的代码
	 * <p>
	 * 注意：<br>
	 * 《1》原先的Fragment的回调方法名字后面要加个Lazy，比如Fragment的onCreateView方法， 就写成onCreateViewLazy <br>
	 * 《2》使用该LazyFragment会导致多一层布局深度
	 * <p>
	 * LuckyJayce
	 */
	public class LazyFragment extends BaseFragment {
		private boolean isInit = false;
		private Bundle savedInstanceState;
		public static final String INTENT_BOOLEAN_LAZYLOAD = "intent_boolean_lazyLoad";
		private boolean isLazyLoad = true;
		private FrameLayout layout;

		@Deprecated
		protected final void onCreateView(Bundle savedInstanceState) {
			super.onCreateView(savedInstanceState);
			this.savedInstanceState = savedInstanceState;
			Bundle bundle = getArguments();
			if (bundle != null) {
				isLazyLoad = bundle.getBoolean(INTENT_BOOLEAN_LAZYLOAD, isLazyLoad);
			}
			//为什么不直接getUserVisibleHint();而是通过自己存isVisibleToUserState变量判断
			//因为v4的25的版本 已经调用 setUserVisibleHint(true)，结果到这里getUserVisibleHint是false
			// （ps:看了FragmentManager源码Fragment被重新创建有直接赋值isVisibleToUser不知道是不是那里和之前v4有改动的地方）
			//所以我默认VISIBLE_STATE_NOTSET，之前没有调用setUserVisibleHint方法，就用系统的getUserVisibleHint，否则就用setUserVisibleHint后保存的值
			//总之就是调用了setUserVisibleHint 就使用setUserVisibleHint的值
			boolean isVisibleToUser;
			if (isVisibleToUserState == VISIBLE_STATE_NOTSET) {
				isVisibleToUser = getUserVisibleHint();
			} else {
				isVisibleToUser = isVisibleToUserState == VISIBLE_STATE_VISIABLE;
			}
			if (isLazyLoad) {
				if (isVisibleToUser && !isInit) {
					isInit = true;
					onCreateViewLazy(savedInstanceState);
				} else {
					LayoutInflater layoutInflater = inflater;
					if (layoutInflater == null) {
						layoutInflater = LayoutInflater.from(getApplicationContext());
					}
					layout = new FrameLayout(layoutInflater.getContext());
					View view = getPreviewLayout(layoutInflater, layout);
					if (view != null) {
						layout.addView(view);
					}
					layout.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
					super.setContentView(layout);
				}
			} else {
				isInit = true;
				onCreateViewLazy(savedInstanceState);
			}
		}

		private int isVisibleToUserState = VISIBLE_STATE_NOTSET;
		//未设置值
		private static final int VISIBLE_STATE_NOTSET = -1;
		//可见
		private static final int VISIBLE_STATE_VISIABLE = 1;
		//不可见
		private static final int VISIBLE_STATE_GONE = 0;

		@Override
		public void setUserVisibleHint(boolean isVisibleToUser) {
			super.setUserVisibleHint(isVisibleToUser);
			isVisibleToUserState = isVisibleToUser ? VISIBLE_STATE_VISIABLE : VISIBLE_STATE_GONE;
			if (isVisibleToUser && !isInit && getContentView() != null) {
				isInit = true;
				onCreateViewLazy(savedInstanceState);
				onResumeLazy();
			}
			if (isInit && getContentView() != null) {
				if (isVisibleToUser) {
					isStart = true;
					onFragmentStartLazy();
				} else {
					isStart = false;
					onFragmentStopLazy();
				}
			}
		}

		protected View getPreviewLayout(LayoutInflater inflater, ViewGroup container) {
			return null;
		}

		@Deprecated
		@Override
		public final void onStart() {
			super.onStart();
			if (isInit && !isStart && getUserVisibleHint()) {
				isStart = true;
				onFragmentStartLazy();
			}
		}

		@Deprecated
		@Override
		public final void onStop() {
			super.onStop();
			if (isInit && isStart && getUserVisibleHint()) {
				isStart = false;
				onFragmentStopLazy();
			}
		}

		private boolean isStart = false;

		protected void onFragmentStartLazy() {

		}

		protected void onFragmentStopLazy() {

		}

		protected void onCreateViewLazy(Bundle savedInstanceState) {

		}

		protected void onResumeLazy() {

		}

		protected void onPauseLazy() {

		}

		protected void onDestroyViewLazy() {

		}

		@Override
		public void setContentView(int layoutResID) {
			if (isLazyLoad && getContentView() != null && getContentView().getParent() != null) {
				layout.removeAllViews();
				View view = inflater.inflate(layoutResID, layout, false);
				layout.addView(view);
			} else {
				super.setContentView(layoutResID);
			}
		}

		@Override
		public void setContentView(View view) {
			if (isLazyLoad && getContentView() != null && getContentView().getParent() != null) {
				layout.removeAllViews();
				layout.addView(view);
			} else {
				super.setContentView(view);
			}
		}

		@Override
		@Deprecated
		public final void onResume() {
			super.onResume();
			if (isInit) {
				onResumeLazy();
			}
		}

		@Override
		@Deprecated
		public final void onPause() {
			super.onPause();
			if (isInit) {
				onPauseLazy();
			}
		}

		@Override
		@Deprecated
		public final void onDestroyView() {
			super.onDestroyView();
			if (isInit) {
				onDestroyViewLazy();
			}
			isInit = false;
		}
	}



	import java.lang.reflect.Field;

	import android.content.Context;
	import android.os.Bundle;
	import android.support.v4.app.Fragment;
	import android.view.LayoutInflater;
	import android.view.View;
	import android.view.ViewGroup;

	public class BaseFragment extends Fragment {
		protected LayoutInflater inflater;
		private View contentView;
		private Context context;
		private ViewGroup container;

		@Override
		public void onCreate(Bundle savedInstanceState) {
			super.onCreate(savedInstanceState);
			context = getActivity().getApplicationContext();
		}

		@Override
		public final View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
			this.inflater = inflater;
			this.container = container;
			onCreateView(savedInstanceState);
			if (contentView == null)
				return super.onCreateView(inflater, container, savedInstanceState);
			return contentView;
		}

		protected void onCreateView(Bundle savedInstanceState) {

		}

		@Override
		public void onDestroyView() {
			super.onDestroyView();
			contentView = null;
			container = null;
			inflater = null;
		}

		public Context getApplicationContext() {
			return context;
		}

		public void setContentView(int layoutResID) {
			setContentView((ViewGroup) inflater.inflate(layoutResID, container, false));
		}

		public void setContentView(View view) {
			contentView = view;
		}

		public View getContentView() {
			return contentView;
		}

		public View findViewById(int id) {
			if (contentView != null)
				return contentView.findViewById(id);
			return null;
		}

		// http://stackoverflow.com/questions/15207305/getting-the-error-java-lang-illegalstateexception-activity-has-been-destroyed
		@Override
		public void onDetach() {
			super.onDetach();
			try {
				Field childFragmentManager = Fragment.class.getDeclaredField("mChildFragmentManager");
				childFragmentManager.setAccessible(true);
				childFragmentManager.set(this, null);

			} catch (NoSuchFieldException e) {
				throw new RuntimeException(e);
			} catch (IllegalAccessException e) {
				throw new RuntimeException(e);
			}
		}

	}


使用方法


	public class ListFragment extends LazyFragment {

		@Override
		protected void onCreateViewLazy(Bundle savedInstanceState) {
			super.onCreateViewLazy(savedInstanceState);
			// 在这里进行初始化控件 findViewById
		}

		@Override
		protected void onResumeLazy() {
			super.onResumeLazy();
			// 在这里加载数据
		}

		@Override
		protected void onDestroyViewLazy() {
			super.onDestroyViewLazy();
			// 在这里进行对象的释放
		}
	}

