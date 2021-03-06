<main id="main" role="main" class="intake">
    <div class="container">

        <div class="form-block">

            <h1>Edit My Profile</h1>

            <?= $this->session->flashdata('message'); ?>

            <?php echo form_open_multipart(
                "/dashboard/save_profile",
                array('class' => 'form', 'role' => 'form', 'id' => 'profile_form')
            ); ?>
            <div class="carousel">
                <div class="mask">
                    <div class="slideset">

                        <div data-cycle-hash="register" class="slide register_slide">

                            <?php
                            // determine match status

                            $status = "pending";

                            if ($me['is_matched'] > 0 && $me['match_status'] == 'pending') {
                                $status = "waiting";
                            }

                            if ($me['is_matched'] > 0 && $me['match_status'] == 'active') {
                                $status = "matched";
                            }

                            ?>


                            <div class="form-box">
                                <strong class="title"> <a href="/dashboard" style="font-weight: bold;"> &larr; BACK</a> <span
                                        style="float:right;"><a href="#">STATUS: <?= strtoupper(
                                                $status
                                            ) ?></a> </span> </strong>

                                <div class="holder" style="min-height:620px; line-height: 20px;">

                                    <?php
                                    //determine picture filename

                                    $pic_src = "/assets/images/img5.png";

                                    if($me['picture'])
                                        $pic_src = "/uploads/".$me['picture'];

                                    ?>

                                    <div class="col-xs-12">
                                        <div class="img-box">
                                            <img style="float:left; padding-right:10px;" class="col-xs-7"
                                                 src="<?=$pic_src?>"
                                                 alt="<?= $me['first_name'] ?> <?= $me['last_name'] ?>">
                                        </div>


                                        <h4 style="font-weight: bold; padding-left:10px;">
                                            <?= $me['first_name'] ?>
                                            <?=$this->session->userdata('demo') == 1 ? '**********' : $me['last_name'];?>

                                        </h4>

                                        <p><?= $me['menteer_type'] == 37 ? 'Mentor' : ''; ?><?= $me['menteer_type'] == 38 ? 'Mentee' : ''; ?><?= $me['menteer_type'] == 41 ? 'Mentee/Mentor' : ''; ?></p>

                                        <p><?=$this->session->userdata('demo') == 1 ? '**********'.substr($me['email'],strpos($me['email'],'@'),28) : $me['email'];?></p>

                                        <div style="clear:both;"></div>

                                        <p style="padding-left:15px;padding-top:3px; font-size:.7em;">Update Picture: <input
                                                type="file" name="userfile" size="20" /><small><em>(ideal pic size is 250px X 250px)</em></small></p>

                                        <hr/>

                                        <div class="col-xs-12 col-md-6 col-sm-6 col-lg-6"><input style="line-height: 26px; margin-bottom:10px;" class="col-xs-12"
                                                                     type="text"
                                                                     name="location" placeholder="Location"
                                                                     value="<?= $me['location'] ?>"></div>
                                        <div class="col-xs-12 col-md-6 col-sm-6 col-lg-6"><input style="line-height: 18px;" class="col-xs-12"
                                                                     type="text"
                                                                     name="phone" placeholder="Phone"
                                                                     value="<?=$this->session->userdata('demo') == 1 ? '*** - *** - ****' : $me['phone'];?>"></div>


                                        <div class="col-xs-12">
                                            <hr/>

                                            <div style="clear:both;"></div>
                                            <strong class="title"> CAREER STATUS</strong>
                                            <textarea class="col-xs-12" rows="1"
                                                      name="career_status"><?= $me['career_status'] ?></textarea>

                                            <div style="clear:both;"></div>
                                            <strong class="title"> CAREER GOALS</strong>
                                            <textarea class="col-xs-12" rows="5"
                                                      name="career_goals"><?= $me['career_goals'] ?></textarea>

                                            <div style="clear:both;"></div>
                                            <strong class="title"> EDUCATION</strong>
                                            <textarea class="col-xs-12" rows="5"
                                                      name="education"><?= $me['education'] ?></textarea>


                                            <div style="clear:both;"></div>
                                            <strong class="title"> EXPERIENCE</strong>
                                            <textarea class="col-xs-12" rows="5"
                                                      name="experience"><?= $me['experience'] ?></textarea>

                                            <div style="clear:both;"></div>
                                            <strong class="title"> SKILLS</strong>
                                            <textarea class="col-xs-12" rows="5"
                                                      name="skills"><?= $me['skills'] ?></textarea>


                                            <div style="clear:both;"></div>
                                            <strong class="title"> PASSION</strong>
                                            <textarea class="col-xs-12" rows="5"
                                                      name="passion"><?= $me['passion'] ?></textarea>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="btn-holder "><a href="/dashboard/myintake">Edit Full Questionnaire</a>
                </div>
                <div class="btn-holder ">

                    <button class="btn btn-success profile-save">save</button>
                    <a href="/dashboard">cancel</a>
                    <div style="clear:both;"></div>
                    <img class="hide rotator" src="/assets/images/rotator.gif" width="50" height="50" alt="uploading..." />
                </div>

                <?php echo form_close(); ?>
            </div>
        </div>
</main>