<script lang="ts">
    import { alert } from "$lib/state.svelte";
    import {xCircle} from '$lib/icon';
    let timeout:any;
    
    let review=(msg:string)=>{
        clearTimeout(timeout);
        if (alert.ms > 0 && msg) timeout = setTimeout(() => {
            alert.msg='';
            alert.type='';
        
        }, alert.ms);
        
    };
    


    $effect(() => {
        if(alert.type==='error') alert.ms=0;
        review(alert.msg);
    });



    
    </script>


    {#if alert.msg}
        <div role="alert" class="alert-page" >
            <div class={alert.type==='error' ? `alert-box error` : `alert-box`}>
                <div class={'alert-msg'}>{alert.msg}</div>
                <div class="alert-msg"><a href={'javascript:void(0)'} style="color:white;" onclick={()=>alert.msg=''}>{@html xCircle()}</a></div>
        
            </div>
          </div>
    {/if}
    

      <style>


        .alert-page {
            position: fixed;
            cursor: pointer;
            display:flex;
            flex-direction:column;
            align-items: start;
            justify-content: start;
            background:rgba(0,0,0,0);/*#28bd14;*/
            color:#fff;
            margin-right:0;
            margin-top:0;
            right:0;
            top:0;
            min-width:30rem;
            min-height:100vh;
            min-width:100vw;
            z-index:100;
        }

        .alert-box {
            height:6rem;
            background:rgba(34,139,34,0.9);/*#28bd14;*/
            width:100%;
            top:0;
            display:flex;
            justify-content:space-between;

        }

        .error {
            background:rgba(178,34,34,0.9);
        }

        .alert-msg {
            padding:2rem;
            border:0px solid #fff;
            text-transform: uppercase;
           
        }

       
      </style>
