---
layout:     post
title:      "android-alert"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/post-bg-android.jpg"
tags:
    - "android"
---
    final AlertDialog alertDialog = new AlertDialog.Builder(context).create();
                alertDialog.show();
                Window window = alertDialog.getWindow();
                window.clearFlags(WindowManager.LayoutParams.FLAG_ALT_FOCUSABLE_IM);
                window.setContentView(R.layout.add_jizhang_layout);
                ImageView close_dialog_imgview = (ImageView) window.findViewById(R.id.close_dialog_imgview);
                close_dialog_imgview.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        alertDialog.dismiss();
                    }
                });
                final EditText input_name_edittext = (EditText) window.findViewById(R.id.input_name_edittext);
                final EditText input_price_edittext = (EditText) window.findViewById(R.id.input_price_edittext);
                input_price_edittext.setInputType(InputType.TYPE_CLASS_NUMBER | InputType.TYPE_NUMBER_FLAG_DECIMAL);
                ImageView minus_imgview = (ImageView) window.findViewById(R.id.minus_imgview);
                ImageView add_imgview = (ImageView) window.findViewById(R.id.add_imgview);
                final TextView num_txtview = (TextView) window.findViewById(R.id.num_txtview);
                final TextView total_money = (TextView) window.findViewById(R.id.total_money);
                Button save_button = (Button) window.findViewById(R.id.save_button);
                save_button.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        if (ValidateUtil.inNotNull(input_name_edittext, "姓名")) {
                            if (ValidateUtil.inNotNull(input_price_edittext, "单价")) {
                                if (Integer.valueOf(num_txtview.getText().toString()) == 0) {
                                    ToastUtils.show(context, "请选择数量");
                                } else {
                                    String name = input_name_edittext.getText().toString();
                                    String num = num_txtview.getText().toString();
                                    PRogDialog.showProgressDialog(context, "加载中...");
                                    AppAction.getInstance().addJiZhang(context, getIntent().getStringExtra("time"), name, num, total_money_num, new HttpResponseHandler() {
                                        @Override
                                        public void onResponeseSucess(int code, BaseJsonEntity baseJson) {
                                            if ("200".equals(baseJson.getCode())) {
                                                ToastUtils.show(context, "添加成功");
                                                alertDialog.dismiss();
                                            }
                                        }

                                        @Override
                                        public void onResponeseFail(Throwable reason, String e) {
                                            ToastUtils.show(context, e);
                                        }

                                        @Override
                                        public void onFinish() {
                                            super.onFinish();
                                            PRogDialog.ProgressDialogDismiss();
                                            pullToRefreshListView.doPullRefreshing(true, 100);
                                            double temp = Double.valueOf(getIntent().getStringExtra("total_money")) + Double.valueOf(total_money_num);
                                            price_txtview.setText("¥" + MathUtils.round2(temp + ""));
                                        }
                                    });
                                }
                            }
                        }
                    }
                });

                input_price_edittext.addTextChangedListener(new TextWatcher() {
                    @Override
                    public void beforeTextChanged(CharSequence s, int start, int count, int after) {

                    }

                    @Override
                    public void onTextChanged(CharSequence s, int start, int before, int count) {

                    }

                    @Override
                    public void afterTextChanged(Editable s) {
                        double num = Double.valueOf(num_txtview.getText().toString());
                        double single_price ;
                        if (input_price_edittext.getText().toString().equals("")) {
                            single_price = 0;
                        } else if (input_price_edittext.getText().toString().equals(".")) {
                            input_price_edittext.setText("");
                            single_price = 0;
                        } else {
                            single_price = Double.valueOf(input_price_edittext.getText().toString());
                        }
                        total_money.setText("¥" + MathUtils.round2(MathUtils.mul(num, single_price, 2) + ""));
                        total_money_num = MathUtils.round2(MathUtils.mul(num, single_price, 2) + "");
                    }
                });

                minus_imgview.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        if (ValidateUtil.inNotNull(input_price_edittext, "单价")) {
                            int num = Integer.valueOf(num_txtview.getText().toString());
                            if (num != 0) {
                                num_txtview.setText(--num + "");

                                double num1 = Double.valueOf(num_txtview.getText().toString());
                                double single_price = Double.valueOf(input_price_edittext.getText().toString());
                                total_money.setText("¥" + MathUtils.round2(MathUtils.mul(num1, single_price, 2) + ""));
                                total_money_num = MathUtils.round2(MathUtils.mul(num, single_price, 2) + "");
                            }
                        }
                    }
                });
                add_imgview.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        if (ValidateUtil.inNotNull(input_price_edittext, "单价")) {
                            int num = Integer.valueOf(num_txtview.getText().toString());
                            num_txtview.setText(++num + "");

                            double num1 = Double.valueOf(num_txtview.getText().toString());
                            double single_price = Double.valueOf(input_price_edittext.getText().toString());
                            total_money.setText("¥" + MathUtils.round2(MathUtils.mul(num1, single_price, 2) + ""));
                            total_money_num = MathUtils.round2(MathUtils.mul(num, single_price, 2) + "");
                        }

                    }
                });

            }
        });
