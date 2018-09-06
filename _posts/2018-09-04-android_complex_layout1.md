---
layout: post
title: "android复杂布局"
date: 2018-09-04
category: android
tags: android
---

示例图  
![原型图]({{site.img_link}}/18/01.png)

分析：  
通过分析原型图，分为4个模块  

1.轮播图  
2.公告  
3.指示器  
4.内容列表  

---

实现：
轮播图使用[BGABanner-Android](https://github.com/bingoogolapple/BGABanner-Android)库  
公告使用ViewFlipper控件  
指示器切换使用[MagicIndicator](https://github.com/hackware1993/MagicIndicator)库  
内容列表使用ViewPager+Fragment（RecyclerView）  

![实现图]({{site.img_link}}/18/03.png)

其他依赖：  

[anko](https://github.com/Kotlin/anko)  
[BaseRecyclerViewAdapterHelper](https://github.com/CymChad/BaseRecyclerViewAdapterHelper)  
[glide](https://github.com/bumptech/glide)  
[gson](https://github.com/google/gson)  

---
源码：  
[homepage](https://github.com/tea9/dear_kotlin_code/tree/master/homepage)

目录结构：  
activity  
-HomeViewPagerActivity  
adapter  
-ViewPagerAdapter  
fragment  
-TabFragment  

---

代码：  

activity_home_viewpager.xml  
	
	<android.support.design.widget.CoordinatorLayout
	    xmlns:android="http://schemas.android.com/apk/res/android" android:layout_width="match_parent"
	    android:layout_height="match_parent"
	    xmlns:app="http://schemas.android.com/apk/res-auto"
	    android:id="@+id/cl_page">

	    <android.support.design.widget.AppBarLayout
	        android:layout_width="match_parent"
	        android:layout_height="wrap_content"
	        android:fitsSystemWindows="true">

	        <android.support.v7.widget.Toolbar
	            android:id="@+id/toolbar"
	            android:layout_width="match_parent"
	            android:layout_height="wrap_content"
	            app:contentInsetLeft="0dp"
	            app:contentInsetStart="0dp"
	            app:layout_scrollFlags="scroll|enterAlways" >
	            <include
	                layout="@layout/item_banner" />

	        </android.support.v7.widget.Toolbar>

	        <net.lucode.hackware.magicindicator.MagicIndicator
	            android:id="@+id/magic_indicator"
	            android:layout_width="match_parent"
	            android:layout_height="40dp" />
	    </android.support.design.widget.AppBarLayout>
	    <LinearLayout
	        android:layout_width="match_parent"
	        android:layout_height="match_parent"
	        android:orientation="vertical"
	        android:scrollbars="none"
	        app:layout_behavior="@string/appbar_scrolling_view_behavior">
	        <android.support.v4.view.ViewPager
	            android:id="@+id/view_pager"
	            android:layout_width="match_parent"
	            android:layout_height="match_parent" />
	    </LinearLayout>
	</android.support.design.widget.CoordinatorLayout>


分析：  
使用CoordinatorLayout+AppBarLayout+Toolbar实现tab头部依附效果  
![列表图]({{site.img_link}}/18/02.png)
MagicIndicator指示器控件  
ViewPager指示器滑动切换  

---

item_banner.xml  

    <LinearLayout
        xmlns:android="http://schemas.android.com/apk/res/android" android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical"
        xmlns:app="http://schemas.android.com/apk/res-auto">
    
        <cn.bingoogolapple.bgabanner.BGABanner
            android:id="@+id/banner"
            android:layout_width="match_parent"
            android:layout_height="180dp"
            android:visibility="visible"
            app:banner_pageChangeDuration="1000"
            app:banner_pointAutoPlayAble="true"
            app:banner_pointContainerBackground="@android:color/transparent"
            app:banner_pointDrawable="@drawable/bga_banner_selector_point_hollow"
            app:banner_pointTopBottomMargin="15dp"
            app:banner_transitionEffect="alpha" />
    
        <LinearLayout
            xmlns:android="http://schemas.android.com/apk/res/android" android:layout_width="match_parent"
            android:layout_height="40dp"
            android:orientation="horizontal"
            android:gravity="center_vertical">
            <ImageView
                android:layout_width="15dp"
                android:layout_height="15dp"
                android:background="@mipmap/ic_notice_m"
                android:layout_marginStart="10dp"
                android:layout_marginEnd="10dp"/>
    
            <ViewFlipper
                android:id="@+id/view_flipper"
                android:layout_weight="1"
                android:layout_width="match_parent"
                android:layout_height="25dp"
                android:autoStart="true"
                android:layout_gravity="center_vertical"
                android:paddingTop="2dp"
                android:flipInterval="2000"
                android:inAnimation="@anim/anim_come_in"
                android:outAnimation="@anim/anim_get_out">
            </ViewFlipper>
            <ImageView
                android:layout_width="10dp"
                android:layout_height="10dp"
                android:background="@mipmap/ic_more"
                android:layout_marginStart="10dp"
                android:layout_marginEnd="10dp"/>
        </LinearLayout>
    
    </LinearLayout>


item_banner.xml实现了轮播图+公告  
![轮播图+广告]({{site.img_link}}/18/04.png)
BGABanner轮播图  
ViewFlipper公告

---

上下滚动动画：  

anim/anim_come_in.xml

    <set xmlns:android="http://schemas.android.com/apk/res/android">
    
        <translate
            android:fromYDelta="100%p"
            android:toYDelta="0"
            android:duration="1000"/>
    </set>

anim/anim_get_out.xml

    <set xmlns:android="http://schemas.android.com/apk/res/android">
        <translate
            android:fromYDelta="0"
            android:toYDelta="-100%p"
            android:duration="1000"/>
    </set>


---


HomeViewPagerActivity.kt  
	

    class HomeViewPagerActivity :AppCompatActivity() {
    
        var tabList = arrayListOf("tab1","tab2","tab3","tab4","tab5","tab6","tab7")
        var imgList:ArrayList<String> = arrayListOf("https://images.unsplash.com/photo-1531026383433-6ed5a112afbc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c010c700aac502636ad0b579ce1274a4&auto=format&fit=crop&w=1650&q=80","https://images.unsplash.com/photo-1531075515553-b4d1f75ff534?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b3f6b409e70fca36a74369d882e85f49&auto=format&fit=crop&w=1567&q=80","https://images.unsplash.com/photo-1531130744926-1d86103aebeb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=28f240aae3de685fc4742f09c922f6f8&auto=format&fit=crop&w=1714&q=80")
        var mesList = arrayListOf("您的公告1","您的公告2","您的公告3")
        var dataList = arrayListOf<String>("hhhhhh","sssss","aaa","bbb","zzz","aaa","bbb","kkk","aaa","bbb","shaomiao","aaa","bbb","ojj","aaa","bbb","fjkjk","aaa","bbb","dfkdkjk","aaa","bbb")
    
    
        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(R.layout.activity_home_viewpager)
            setSupportActionBar(toolbar)
    
            initBanner()
            initViewFlipper()
            initViewpager()
            initMagicIndicator()
        }
    
        fun initBanner() {
            banner.setAdapter(BGABanner.Adapter<ImageView,String> { banner, itemView, model, position ->
                Glide.with(itemView.context)
                        .load(model)
                        .apply(RequestOptions().placeholder(R.mipmap.ic_launcher).error(R.mipmap.ic_launcher).dontAnimate().centerCrop())
                        .into(itemView)
            })
            banner.setData(imgList, Arrays.asList("","",""))
            // 点击事件
            banner.setDelegate { banner, itemView, model, position -> toast(model.toString()+position) }
        }
    
        fun initViewFlipper() {
            for (i in mesList.indices) {
                var view = LayoutInflater.from(this).inflate(R.layout.item_textview,null)
                view.findViewById<TextView>(R.id.text_view).text = mesList[i]
                view.setOnClickListener {
                    toast(mesList[i]+i)
                }
                view_flipper.addView(view)
            }
            view_flipper.isAutoStart = true
        }
    
        fun initMagicIndicator() {
            var commonNavigator = CommonNavigator(this)
            commonNavigator.adapter = object : CommonNavigatorAdapter() {
                override fun getCount(): Int {
                    return  if (tabList == null)0 else tabList.size
                }
    
                override fun getTitleView(p0: Context?, p1: Int): IPagerTitleView {
                    var colorTransitionPagerTitleView = ColorTransitionPagerTitleView(p0)
                    colorTransitionPagerTitleView.normalColor= ContextCompat.getColor(p0!!,R.color.abc_btn_colored_borderless_text_material)
                    colorTransitionPagerTitleView.selectedColor = ContextCompat.getColor(p0!!,R.color.abc_btn_colored_borderless_text_material)
                    colorTransitionPagerTitleView.text = tabList[p1].toUpperCase()
    
                    colorTransitionPagerTitleView.setOnClickListener (View.OnClickListener {
                        view_pager.currentItem = p1
    
                    })
                    return colorTransitionPagerTitleView
                }
                override fun getIndicator(p0: Context?): IPagerIndicator {
                    var indicator: LinePagerIndicator = LinePagerIndicator(p0)
                    indicator.mode = LinePagerIndicator.MODE_EXACTLY
                    indicator.setColors(ContextCompat.getColor(p0!!,R.color.abc_btn_colored_borderless_text_material))
                    return indicator
    
                }
            }
            magic_indicator.navigator = commonNavigator
            ViewPagerHelper.bind(magic_indicator,view_pager)
        }
    
        fun initViewpager() {
            var adapter = ViewPagerAdapter(supportFragmentManager,tabList, Gson().toJson(dataList))
            view_pager.adapter = adapter
        }
    
    }


tabList:指示器数据  
imgList:轮播图数据  
mesList:公告数据  
dataList:列表数据  

initBanner():初始化轮播图  
initViewFlipper():初始化公告  
initMagicIndicator():初始化指示器  
initViewpager():初始化ViewPager  

---

ViewPagerAdapter.kt ViewPager适配器  


    class ViewPagerAdapter(fm: FragmentManager?, var tabList:ArrayList<String>, var listStr:Any) : FragmentPagerAdapter(fm){
    
        override fun getItemPosition(`object`: Any): Int {
            return PagerAdapter.POSITION_NONE
        }
    
        override fun instantiateItem(container: ViewGroup, position: Int): Any {
            var fragment :TabFragment = super.instantiateItem(container, position) as TabFragment
            fragment.updateArguments(position, listStr.toString())
            return fragment
        }
    
        override fun getCount(): Int {
            return  tabList.size
        }
    
        override fun getPageTitle(position: Int): CharSequence? {
            return tabList[position]
        }
    
    
        override fun getItem(position: Int): Fragment {
            return  TabFragment.create(position, Gson().toJson(listStr))
        }
    
    
        override fun notifyDataSetChanged() {
            super.notifyDataSetChanged()
        }
    }


---

TabFragment.kt  


    class TabFragment: Fragment(){
        var pageType:Int = 0
        var data:String = ""
        var adapter:BaseQuickAdapter<String,BaseViewHolder>? = null
    
        companion object TabFragment{
            fun create(pageType:Int,data:String) : com.example.homepage.fragment.TabFragment {
                var f = TabFragment()
                var args = Bundle()
                args.putInt("position",pageType)
                args.putString("data",data)
                f.arguments=args
                return f
            }
        }
    
        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            var args: Bundle = arguments!!
            if (null!=args) {
                pageType = args.getInt("position")
                data = args.getString("data")
                Log.e("shaomiaodata",data)
            }
        }
    
        override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
            var view: View = inflater.inflate(R.layout.recycler_view,container,false)
            initRecyclerView(view)
            return view
        }
    
        fun initRecyclerView(view:View) {
            var layoutManager = LinearLayoutManager(context)
            layoutManager.orientation = OrientationHelper.VERTICAL
            var recycler_view = view.findViewById<RecyclerView>(R.id.recycler_view)
            recycler_view.layoutManager = layoutManager
            recycler_view.addItemDecoration(DividerItemDecoration(context, LinearLayoutManager.VERTICAL))
    
            var list1=  data!!.fromListJson<String>()
            adapter = object : BaseQuickAdapter<String,BaseViewHolder>(R.layout.item_layout,list1 as List<String>) {
                override fun convert(helper: BaseViewHolder?, item: String?) {
                    helper!!.setText(R.id.item_tv,item)
                    helper.addOnClickListener(R.id.item_tv)
                }
            }
            adapter!!.onItemChildClickListener = BaseQuickAdapter.OnItemChildClickListener { adapter, view, position ->
                toast("itemclick"+position)
            }
            recycler_view.adapter = adapter
        }
    	// 解析json数据
        inline fun <reified T> String.fromListJson(charset: Charset = Charset.forName("UTF-8")): ArrayList<T>? {
            val gson = GsonBuilder().create()
            return gson.fromJson<ArrayList<T>>(this.toByteArray(charset).toString(charset),object : TypeToken<ArrayList<T>>(){}.type)
        }
    
        fun updateArguments(pageType:Int,data:String) {
            this.pageType = pageType
            this.data = data
            var args: Bundle = arguments!!
            if (null!=args) {
                args.putInt("pageType",pageType)
                args.putString("data",data)
            }
        }
    
    }


---
源码：  
[homepage](https://github.com/tea9/dear_kotlin_code/tree/master/homepage)