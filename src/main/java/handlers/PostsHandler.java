package handlers;

import models.Post;
import models.Response;
import models.User;
import utilities.PoolManager;
import utilities.PropertiesReader;

import java.io.File;
import java.sql.*;
import java.util.ArrayList;

public class PostsHandler {
    private static PoolManager poolManager = PoolManager.getPoolManager();
    private static PropertiesReader prop = PropertiesReader.getInstance();

    public static Response<ArrayList<Post>> getPosts(int id, int postsCount, String username) {
        Response<ArrayList<Post>> response = new Response<>();
        ArrayList<Post> posts = new ArrayList<>();
        Connection con = poolManager.getConn();
        String query = prop.getValue("getPosts");
        try {
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, id);
            ps.setInt(2, id);
            ps.setInt(3, postsCount);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                Post post = new Post();
                User user = new User();
                post.setIdPost(rs.getInt(1));
                post.setTypePost(rs.getInt(2));
                post.setPostText(rs.getString(3));
                post.setUrl(rs.getString(4));
                post.setCreationTime(rs.getTimestamp(5));
                post.setFileCount(getFileCount(username, post.getIdPost()));
                user.setUsername(rs.getString(6));
                user.setName(rs.getString(7));
                user.setLastName(rs.getString(8));
                user.setAvatar(rs.getString(9));

                post.setUser(user);
                posts.add(post);
            }
            response.setData(posts);
            response.setMessage("Posts Returned");
            response.setStatus(200);
        } catch(SQLException e) {
            e.printStackTrace();
            response.setMessage("DB Connection Error");
            response.setStatus(500);
        } finally {
            poolManager.returnConn(con);
        }

        return response;
    }

    public static Response<Integer> addPost(Post post) {
        Response<Integer> response = new Response<>();
        Connection con = poolManager.getConn();
        String query = prop.getValue("addPost");
        try {
            PreparedStatement ps = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, post.getUser().getId());
            ps.setInt(2, post.getTypePost());
            ps.setString(3, post.getPostText());
            ps.execute();
            response.setMessage("Added post successfully.");
            response.setStatus(200);
            ResultSet rs = ps.getGeneratedKeys();
            rs.next();
            response.setData(rs.getInt(1));
        }
        catch (SQLException e) {
            e.printStackTrace();
            response.setMessage("Error while posting.");
            response.setStatus(500);
            response.setData(-1);
        }
        finally {
            poolManager.returnConn(con);
        }
        return response;
    }

    public static Response<ArrayList<Post>> getUserPosts(int username) {
        Response<ArrayList<Post>> response = new Response<>();
        ArrayList<Post> posts = new ArrayList<>();
        Connection con = poolManager.getConn();
        String query = prop.getValue("getUserPosts");
        try {
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, username);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                Post post = new Post();
                post.setIdPost(rs.getInt(1));
                post.setTypePost(rs.getInt(2));
                post.setPostText(rs.getString(3));
                post.setUrl(rs.getString(4));
                post.setCreationTime(rs.getTimestamp(5));

                posts.add(post);
            }
            response.setData(posts);
            response.setMessage("User Posts Returned");
            response.setStatus(200);

        } catch (SQLException e) {
            e.printStackTrace();
            response.setMessage("DB Connection Error");
            response.setStatus(500);
        } finally {
            poolManager.returnConn(con);
        }

        return response;
    }

    public static int getFileCount(String username, int id) {
        String baseDir = System.getenv("SystemDrive") + "/web2p1/assets/users/" + username + "/" + id + "/";
        int count;
        try {
            File file = new File(baseDir);
            count = file.listFiles().length;
        }
        catch(NullPointerException e) { count = 0; }
        return count;
    }
}